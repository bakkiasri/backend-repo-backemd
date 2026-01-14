const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const booksPath = path.join(__dirname, "../data/books.json");

/**
 * POST /api/orders
 * action = "add"    → sold = true
 * action = "remove" → sold = false
 */
router.post("/", (req, res) => {
  try {
    const { cart, action } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const books = JSON.parse(fs.readFileSync(booksPath, "utf-8"));

    cart.forEach((item) => {
      const index = books.findIndex((b) => b.id === item.id);
      if (index !== -1) {
        books[index].sold = action === "remove" ? false : true;
      }
    });

    fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

    res.json({
      message:
        action === "remove" ? "Book removed from cart" : "Book added to cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
