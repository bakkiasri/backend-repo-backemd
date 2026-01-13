const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const bookRoutes = require("./routes/books");
const orderRoutes = require("./routes/order");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
