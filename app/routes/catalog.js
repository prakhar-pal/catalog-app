import express from'express';
import asyncHandler from'express-async-handler';
import * as bookController from'../controllers/book.controller.js';
import * as authorController from '../controllers/author.controller.js';

const Router = express.Router;
const router = Router();

router.get('/books', asyncHandler(bookController.getBooks));
router.get('/book/add', asyncHandler(bookController.renderCreateBookForm));
router.post('/book/add', asyncHandler(bookController.createBook));
router.get('/book/:bookId', asyncHandler(bookController.getBook));
router.delete('/book/:bookId', asyncHandler(bookController.deleteBook));

router.get('/authors');
router.get('/author/add', asyncHandler(authorController.renderAddAuthorForm));
router.post('/author', asyncHandler(authorController.addAuthor));
router.get('/author/:authorId');
router.delete('/author/:authorId');

router.get('/genres');
router.post('/genre');
router.get('/genre/:genreId');
router.delete('/genre/:genreId');

router.get('/bookInstances');
router.post('/bookInstance');
router.get('/bookInstance/:bookInstanceId');
router.delete('/bookInstance/:bookInstanceId');

export default router;
