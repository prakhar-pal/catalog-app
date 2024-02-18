require('dotenv').config()
const path = require('path');
const impress = require("../lib/index");
require('./dbSetup');

const app = impress();

app.use(impress.static(path.join(__dirname, 'public')));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});


const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT);
}catch(err) {
    console.log('app failed;::', err);
}
