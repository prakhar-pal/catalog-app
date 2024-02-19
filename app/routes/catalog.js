import express from'express';
import asyncHandler from'express-async-handler';
import bookController from'../controllers/book.controller.js';

const Router = express.Router;
const router = Router();

router.get('/books', asyncHandler(bookController.getBooks));
router.post('/book', asyncHandler(bookController.createBook));
router.get('/book/:bookId', asyncHandler(bookController.getBook));
router.delete('/book/:bookId', asyncHandler(bookController.deleteBook));

router.get('/authors');
router.post('/author');
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
