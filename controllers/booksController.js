const Book = require('../models/Book');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


/* getAllBooks endpoint */
exports.getAllBooks = catchAsync(async function (req, res, next) {

  const books = await Book.find();
  

  if (books.length === 0) {
    return next(new AppError('No book found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: books.length,
    data: { books },
  });
});



/* getOneBook endpoint */
exports.getOneBook = catchAsync(async function (req, res, next) {

  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new AppError('No book found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { book },
  });
});



/* createBook endpoint */
exports.createBook = catchAsync(async function (req, res) {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Book created successfully',
    data: { book: newBook },
  });
});



/* updateBook endpoint */
exports.updateBook = catchAsync(async function (req, res, next) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    return next(new AppError('No book found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Book updated successfully',
    data: { book },
  });
});




/* deleteBook endpoint */
exports.deleteBook = catchAsync(async function (req, res, next) {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return next(new AppError('No book found with this ID', 404));
  }

  res.status(204).json({
    status: 'success',
    message: 'Book deleted successfully',
    data: null,
  });
});
