import 'dotenv/config.js'
import bodyParser from 'body-parser';
import path from 'node:path';
import nunjucks from 'nunjucks';
import impress from '../lib/index.js';
import catalogRouter from './routes/catalog.js';
import { getCurrentModuleDetails } from './utils.js';
import './dbSetup.js';
import { Book, BookInstance, Author } from './models/index.js';

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

app.get('/', async (req, res) => {
  const [
    totalBooks,
    totalBookInstances,
    totalAuthors
  ] = await Promise.all([
    Book,
    BookInstance,
    Author
  ].map(model => model.find().countDocuments()));
  return res.render('homepage.njk', {
    title: 'Homepage',
    totalBooks,
    totalBookInstances,
    totalAuthors
  });
})

app.use('/catalog', catalogRouter);

app.get("*", function (req, res) {
  return res.render('error', {
    title: '404',
    error: `404: ${req.url} is not found`
  });
});

app.use(customDefaultErrorHandler);

function customDefaultErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500);
  console.log('err', err);
  res.render('error', {
    title: 'Something went wrong',
    error: err
  });
}


const PORT = process.env.PORT || 8080;
try {
    app.listen(PORT);
}catch(err) {
    console.log('app failed;::', err);
}
