const http = require("http");
const path = require("path");
const fs = require('fs');
function impress() {
  const controllers = {};
  const middlewares = [];
  const server = http.createServer(async (req, res) => {
    let skipMiddleware = false;
    middlewares.forEach((middleware) => {
      if (skipMiddleware) {
        return;
      }
      middleware(req, res, function next(result) {
        skipMiddleware = result;
      });
    });
    if(skipMiddleware) {
        return;
    }
    if (controllers?.[req.url]?.[req.method]) {
      return controllers[req.url][req.method](req, res);
    } else if (controllers["*"]) {
      return controllers["*"].get(req, res);
    } else {
      console.log("UNKNOWN_ROUTE_FOUND", req.url);
    //   res.writeHead(200, "text/json");
    //   res.end("{error: true,message: 'unhandled route'}");
    }
  });

  function get() {}

  function listen(port) {
    server.listen(port, () => {
      console.log("started the server");
    });
  }

  function use(middleware) {
    middlewares.push(middleware);
  }
  return {
    get,
    listen,
    use,
  };
}

const getContentType = (file) => {
    const ext = path.extname(file);
    switch (ext) {
      case ".js":
        return "text/javascript";
      case ".css":
        return "text/css";
      case ".json":
        return "application/json";
      case ".png":
        return "image/png";
      case ".jpg":
        return "image/jpg";
      default:
        return "text/html";
    }
  };
  

function assetMiddleware(publicFolder) {
  return function (req, res, next) {
    // const publicFolder = path.join(__dirname, assetPath);
    const pfContents = fs.readdirSync(publicFolder);
    const foundIndex = pfContents.findIndex((publicContent) => {
      const assetToUrl = "/" + publicContent;
      if (
        req.url === assetToUrl ||
        (req.url === "/" && publicContent === "index.html")
      )
        return true;
      return false;
    });
    if (foundIndex >= 0) {
      const assetPath = path.join(publicFolder, pfContents[foundIndex]);
      res.writeHead(200, getContentType(path.extname(assetPath)));
      const contents = fs.readFileSync(assetPath);
      res.end(contents);
      next();
    }
  };
}

module.exports = {
  impress,
  assetMiddleware,
};
