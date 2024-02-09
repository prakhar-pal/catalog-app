const path = require("path");
const fs = require("fs");
const { impress } = require("../lib/index");

const app = impress();
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

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

app.use(function (req, res) {
  const publicFolder = path.join(__dirname, "public");
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
    const assetPath = path.join(__dirname, "public", pfContents[foundIndex]);
    res.writeHead(200, getContentType(path.extname(assetPath)));
    const contents = fs.readFileSync(assetPath);
    res.end(contents);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
