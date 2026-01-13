const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const booksPath = path.join(__dirname, "../data/books.json");
const ordersPath = path.join(__dirname, "../data/orders.json");

// PLACE ORDER
router.post("/", (req, res) => {
  const { user, cart } = req.body;

  let books = JSON.parse(fs.readFileSync(booksPath));
  let orders = JSON.parse(fs.readFileSync(ordersPath));

  // mark books as sold
  cart.forEach((item) => {
    const book = books.find((b) => b.id === item.id);
    if (book) book.sold = true;
  });

  const newOrder = {
    id: Date.now(),
    user,
    cart,
    date: new Date(),
  };

  orders.push(newOrder);

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));

  res.json({ message: "Order placed successfully" });
});

module.exports = router;
