require('dotenv').config()
const path = require('path');
const nunjucks = require('nunjucks');
const impress = require("../lib/index");
const catalogRouter = require('./routes/catalog');
require('./dbSetup');

const app = impress();
nunjucks.configure(path.join(__dirname, 'views'), { autoescape: true, express: app });
app.set('view engine', 'html');

console.log(app.get('views'));

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
