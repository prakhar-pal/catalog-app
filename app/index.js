import 'dotenv/config.js'
import bodyParser from 'body-parser';
import path from 'node:path';
import nunjucks from 'nunjucks';
import impress from '../lib/index.js';
import catalogRouter from './routes/catalog.js';
import { getCurrentModuleDetails } from './utils.js';
import './dbSetup.js';

const { dirname, } = getCurrentModuleDetails(import.meta);

const app = impress();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

nunjucks.configure(path.join(dirname, 'views'), { autoescape: true, express: app });
app.set('view engine', 'njk');

app.use(impress.static(path.join(dirname, 'public')));
app.use('/css', (req, res, next) => {
  res.setHeader('content-type', 'text/css');
  return impress.static(path.join(dirname, 'public/css'))(req, res, next);
});


app.use('/catalog', catalogRouter);

app.get('/', (req, res) => {
  res.redirect('/catalog/books');
})

app.get("*", function (req, res) {
  res.sendFile(path.join(dirname, "public", "404.html"));
});


const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT);
}catch(err) {
    console.log('app failed;::', err);
}
