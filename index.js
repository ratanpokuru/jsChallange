const express = require("express");
const app = express();
app.use(express.json());

let library = [
  "Harry Potter",
  "A Christmas Carol",
  "Moby Dick",
  "The Lord of the Rings",
];

//class to throw custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

var books = "";
var intervals = [];

//getbooklist recursive function
const getBookList = async (library, index, callback) => {
  index++;
  if (index + 1 === library.length) {
    books = books + library[index];
    callback();
  } else {
    books = books + library[index] + ",";
    await getBookList(library, index, callback);
  }
};

//saveItem to databse function
const saveItemOnDatabase = async (name, callback) => {
  const timeDelay = parseInt(Math.random * name.length * 1000);
  let before = Date.now();
  intervals[name] = await setInterval(async () => {
    let after = Date.now();
    savedBooks["" + name + ""] = parseInt(after - before);
    callback(name);
  }, timeDelay);
};

// get list of books

app.get("/", async (req, res) => {
  await getBookList(library, 0, () => {
    res.status(200).send(books);
  });
});

//add book to list
app.post("/", async (req, res) => {
  try {
    if (!req.body.book) {
      throw new ValidationError("Body Param book missing");
    }
    const book = library.find((title) => title === req.body.book);
    if (book) throw new ValidationError(`Book: ${book} alread Exists`);
    library.push(req.body.book);
    res.status(200).send("Book successfully added to library");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//delete a book from list
app.delete("/", async (req, res) => {
  try {
    if (!req.body.book) {
      throw new ValidationError("Body Param book missing");
    }
    const book = library.find((title) => title === req.body.book);
    if (!book) throw new ValidationError(`Book: ${book} does not Exists`);
    library = library.filter((book) => book != req.body.book);
    res.status(200).send("Book successfully deleted from library");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//delete a book from list
app.patch("/", async (req, res) => {
  try {
    if (!req.body.original_book) {
      throw new ValidationError("Body Param original_book missing");
    }
    if (!req.body.new_book) {
      throw new ValidationError("Body Param new_book missing");
    }
    const original_book = library.find(
      (title) => title === req.body.original_book
    );
    if (!original_book)
      throw new ValidationError(
        `Book: ${req.body.original_book} does not Exists`
      );
    const new_book = library.find((title) => title === req.body.new_book);
    if (new_book) throw new ValidationError(`Book: ${new_book} already Exists`);
    library[library.indexOf(req.body.original_book)] = req.body.new_book;
    res.status(200).send("Book successfully updated in the library");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

const savedBooks = [];

//save to database
app.put("/", async (req, res) => {
  try {
    const savedBook = await library.forEach(async (name, index) => {
      await saveItemOnDatabase(name, (data, error) => {
        clearInterval(intervals[data]);
      });
    });
    res.status(200).send(JSON.stringify(savedBooks));
  } catch (error) {
    res.status(500).send(error.messaged);
  }
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}..`));
