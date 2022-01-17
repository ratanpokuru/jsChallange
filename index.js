const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(express.json());

const books = [
  "Harry Potter",
  "1984",
  "A Christmas Carol",
  "Moby Dick",
  "The Lord of the Rings",
];

app.get("/", (req, res) => {
  res.send("Welcome to REST API Code Challange");
});

const port = 80;
app.listen(port, () => console.log(`Listening on port ${port}..`));
