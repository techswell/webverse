const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// GET all books
router.get('/', (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.log('Error retrieving books from database', error);
      res.status(500).json({ error: 'Error retrieving books from database' });
    });
});

// GET a single book by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: `Book with ID ${id} not found` });
      }
      res.json(book);
    })
    .catch((error) => {
      console.log(`Error retrieving book with ID ${id} from database`, error);
      res.status(500).json({ error: `Error retrieving book with ID ${id} from database` });
    });
});

// CREATE a new book
router.post('/', (req, res) => {
  const { title, author, publishedYear, publisher } = req.body;
  const book = new Book({ title, author, publishedYear, publisher });
  book.save()
    .then((newBook) => {
      res.json(newBook);
    })
    .catch((error) => {
      console.log('Error creating new book', error);
      res.status(500).json({ error: 'Error creating new book' });
    });
});

// UPDATE a book by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, publishedYear, publisher } = req.body;
  Book.findByIdAndUpdate(id, { title, author, publishedYear, publisher }, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ error: `Book with ID ${id} not found` });
      }
      res.json(updatedBook);
    })
    .catch((error) => {
      console.log(`Error updating book with ID ${id}`, error);
      res.status(500).json({ error: `Error updating book with ID ${id}` });
    });
});

// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete(id)
    .then((deletedBook) => {
      if (!deletedBook) {
        return res.status(404).json({ error: `Book with ID ${id} not found` });
      }
      res.json(deletedBook);
    })
    .catch((error) => {
      console.log(`Error deleting book with ID ${id}`, error);
      res.status(500).json({ error: `Error deleting book with ID ${id}` });
    });
});

module.exports = router;

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

const booksRouter = require('./routes/books');

app.use('/books', booksRouter);