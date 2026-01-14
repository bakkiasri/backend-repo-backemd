const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", require("./routes/books"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
