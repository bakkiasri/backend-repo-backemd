const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const booksPath = path.join(__dirname, "../data/books.json");

router.get("/", (req, res) => {
  const books = JSON.parse(fs.readFileSync(booksPath));
  const availableBooks = books.filter((book) => !book.sold);
  res.json(availableBooks);
});

router.get("/:id", (req, res) => {
  const books = JSON.parse(fs.readFileSync(booksPath));
  const book = books.find((b) => b.id == req.params.id);
  res.json(book);
});

module.exports = router;
