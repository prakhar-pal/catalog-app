require('dotenv').config();
require('../dbSetup');
const Author = require('../models/Author');
const Book = require('../models/Book');

const author1 = new Author({
    firstName: 'Jane',
    lastName: 'Goodman',
    books: [],
    title: 'Mrs.'
});

const book1 = new Book({
    title: 'Good Older Men',
    author: author1._id
});

async function populateData() {
    await author1.save();
    await book1.save();
}

populateData().then(() => {
    console.log('data was populated');
}).catch((err) => {
    console.log('Caught error populating data', err);
}).finally(() => {
    process.exit();
})