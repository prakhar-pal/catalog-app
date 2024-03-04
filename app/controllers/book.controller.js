import { Author, Book } from '../models/index.js';
import { assert } from '../utils.js';

// @todo - implement the controllers

async function getBooks(req, res) {
    const books = await Book.find().populate('author').exec();
    return res.render('catalog/books', {
        books,
        title: 'Books',
    });
}


async function getBook(req, res) {
    assert(req.params.bookId, 'book id should be valid');
    const book = await Book.findById(req.params.bookId).exec();
    return res.json(book);
}

async function createBook(req, res) {
    const { author, title } = req.body || {};
    assert([author, title], 'author and title are required');
    const book = new Book({
        title,
        author
    });
    await book.save();
    return res.redirect('/catalog/books');
}

function deleteBook() {

}

async function renderCreateBookForm(req, res) {
    const authors = await Author.find().exec();
    return res.render('catalog/add-book', {
        authors,
        title: 'Create a new book'
    });
}

export {
    getBooks,
    getBook,
    createBook,
    deleteBook,
    renderCreateBookForm,
}
