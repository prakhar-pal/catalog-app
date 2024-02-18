require('dotenv').config()
const path = require('path');
const impress = require("../lib/index");
const catalogRouter = require('./routes/catalog');
require('./dbSetup');

const app = impress();

app.use(impress.static(path.join(__dirname, 'public')));
app.use('/catalog', catalogRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});


const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT);
}catch(err) {
    console.log('app failed;::', err);
}
