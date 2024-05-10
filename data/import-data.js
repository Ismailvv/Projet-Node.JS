const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); 
const Book = require('../models/Book');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB ✅'))
  .catch((e) => console.error('Error while connecting to MongoDB ❌', e));

const createUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashedPassword,
    role: role
  });

  await user.save();
  return user._id;
};

const importData = async () => {
   const authors = [
    { username: 'Author1', password: 'password123' },
    { username: 'Author2', password: 'password456' },
    { username: 'Author3', password: 'password789' }
  ];

  const authorIds = [];
  for (let author of authors) {
    const authorId = await createUser(author.username, author.password, 'admin');
    authorIds.push(authorId);
  }

  const books = [
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      author: authorIds[0],
      publishDate: "2022-01-01T00:00:00.000Z",
      genre: "action"
    },
    {
      title: "Pride and Prejudice",
      author: authorIds[1],
      publishDate: "2022-01-01T00:00:00.000Z",
      genre: "romance"
    },
    {
      title: "Attack on Titan",
      author: authorIds[2], 
      publishDate: "2022-01-01T00:00:00.000Z",
      genre: "manga"
    }
  ];

  for (let book of books) {
    const newBook = new Book({
      title: book.title,
      author: book.author,
      publishDate: new Date(book.publishDate),
      genre: book.genre
    });

    await newBook.save();
  }
};

importData().catch(console.error);
