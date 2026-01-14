const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const booksPath = path.join(__dirname, "../data/books.json");

// GET all books
router.get("/", (req, res) => {
  const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
  res.json(books);
});

// GET single book
router.get("/:id", (req, res) => {
  const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
  const book = books.find((b) => b.id == req.params.id);
  res.json(book);
});

// UPDATE sold status
router.put("/:id", (req, res) => {
  const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));
  const index = books.findIndex((b) => b.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[index].sold = req.body.sold;

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

  res.json({
    message: "Book status updated",
    book: books[index],
  });
});

module.exports = router;
