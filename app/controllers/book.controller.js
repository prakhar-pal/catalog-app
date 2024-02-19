const njs = require('nunjucks');
const path = require('path');
const Book = require('../models/Book');
const { assert } = require('../utils');

// @todo - implement the controllers

async function getBooks(req, res) {
    const books = await Book.find().exec();
    return res.render('catalog/books.html', { books });
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
    return res.json({
        success: true,
    });
}

function deleteBook() {

}

module.exports = {
    getBooks,
    getBook,
    createBook,
    deleteBook
}