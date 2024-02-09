const path = require('path');
const { impress, assetMiddleware } = require("../lib/index");
const app = impress();

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.use(assetMiddleware(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT);
}catch(err) {
    console.log('app failed;::', err);
}
