const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let phoneBook = [];

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", function (req, res) {
  res.json(phoneBook);
});

app.post("/add", jsonParser, function (req, res) {
  const newData = req.body;
  const newItem = { ...newData };

  phoneBook.push(newItem);
  res.json(phoneBook);
});

app.post("/delete", jsonParser, function (req, res) {
  const delItem = req.body;
  phoneBook = phoneBook.filter((el) => el.id !== delItem.id);
  res.json(phoneBook);
});

app.listen(process.env.PORT || 8080);
