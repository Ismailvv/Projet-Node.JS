const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const { verifyToken, authorizeRoles } = require('../controllers/middleware');


router
  .route('/')
  .get(verifyToken, authorizeRoles('admin'), booksController.getAllBooks)
  .post(booksController.createBook);

router
  .route('/:id')
  .get(booksController.getOneBook)
  .patch(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = router;
