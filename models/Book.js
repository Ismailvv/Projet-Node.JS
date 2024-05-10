const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  publishDate: Date,
  genre: {
    type: String,
    enum: ['action', 'thriller', 'manga', 'romance', 'policier', 'enfant']
  }
});

module.exports = mongoose.model('Book', bookSchema);
