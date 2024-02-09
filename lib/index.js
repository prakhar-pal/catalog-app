const http = require('http');
function impress() {
  const controllers = {}
  const middlewares = [];
  const server = http.createServer(async (req, res) => {
    middlewares.forEach(middleware => {
      middleware(req, res);
    })
    if(controllers?.[req.url]?.[req.method]) {
      return controllers[req.url][req.method](req, res);
    }else if(controllers['*']) {
      return controllers['*'].get(req, res);
    }else {
       console.log('UNKNOWN_ROUTE_FOUND', req.url);
       res.writeHead(200, 'text/json');
       res.end('{error: true,message: \'unhandled route\'}');
    }
  });
  
  function get() {}

  function listen(port) {
    server.listen(port, () => {
      console.log('started the server');
    })
  }

  function use(middleware) {
    middlewares.push(middleware);
  }
  return {
    get,
    listen,
    use
  }
}

module.exports = {
    impress
}

