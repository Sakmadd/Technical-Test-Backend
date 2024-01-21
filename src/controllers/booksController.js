// booksController.js
import Book from '../models/Books.js';

const isValidReleaseYear = (year) => {
  console.log('Validating release year:', year);
  const isValid = year >= 1980 && year <= 2021;
  console.log('Is valid:', isValid);
  return isValid;
};
const determineThickness = (totalPage) => {
  if (totalPage <= 100) return 'tipis';
  else if (totalPage <= 200) return 'sedang';
  else return 'tebal';
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { title, minYear, maxYear, minPage, maxPage, sortByTitle } = req.query;

    // Filter conditions
    const filter = {};
    if (title) filter.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive title search
    if (minYear) filter.release_year = { $gte: parseInt(minYear) };
    if (maxYear) filter.release_year = { ...filter.release_year, $lte: parseInt(maxYear) };
    if (minPage) filter.total_page = { $gte: parseInt(minPage) };
    if (maxPage) filter.total_page = { ...filter.total_page, $lte: parseInt(maxPage) };

    // Sorting
    const sort = {};
    if (sortByTitle) sort.title = sortByTitle === 'asc' ? 1 : -1;

    const books = await Book.find(filter).sort(sort);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get books' });
  }
};

const createBook = (req, res) => {
  const { title, description, image_url, release_year, price, total_page, category_id } = req.body;

  if (!isValidReleaseYear(release_year)) {
    return res.status(400).json({ error: 'Invalid release year' });
  }
  const thickness = determineThickness(total_page);

  const newBook = new Book({
    title,
    description,
    image_url,
    release_year,
    price,
    total_page,
    thickness,
    created_at: Date.now(),
    updated_at: Date.now(),
    category_id,
  });

  newBook.save()
  .then((book) => res.json(book))
  .catch((err) => {
    res.status(404).json({ error: 'Failed to Create Book' })});
};

const updateBook = async (req, res) => {
  try {
    const { title, description, image_url, release_year, price, total_page, category_id } = req.body;
    const bookId = req.params.id;

    if (!isValidReleaseYear(release_year)) {
      return res.status(400).json({ error: 'Tahun rilis tidak valid' });
    }

    const thickness = determineThickness(total_page);

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        description,
        image_url,
        release_year,
        price,
        total_page,
        thickness,
        updated_at: Date.now(),
        category_id,
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Buku tidak ditemukan' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal memperbarui buku' });
  }
};

const deleteBook = (req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndDelete(bookId, { useFindAndModify: false })
  .then((mess) => res.send('Success Deleting The Book'))
  .catch((err) => res.status(404).json({ error: 'Book Not Found' }));;
};

export { getBookById, getAllBooks, createBook, updateBook, deleteBook };
