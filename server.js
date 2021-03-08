const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jsonParser = bodyParser.json();

/**
 * @description Список элементов
 */
let phoneBook = [];

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/**
 * @description Возвращает список элементов
 */
app.get("/", function (req, res) {
  res.json(phoneBook);
});

/**
 * @description Добавление элемента в список
 */
app.post("/add", jsonParser, function (req, res) {
  const newData = req.body;
  const newItem = { ...newData };

  phoneBook.push(newItem);
  res.json(phoneBook);
});

/**
 * @description Редактирование элемента в списке
 */
app.post("/edit", jsonParser, function (req, res) {
  const newData = req.body;
  const newItem = { ...newData };

  phoneBook = phoneBook.map((el) => {
    if (el.id === newItem.id) {
      return { ...el, ...newItem };
    }
    return { ...el };
  });
  res.json(phoneBook);
});

/**
 * @description Удаление элемента из списка
 */
app.post("/delete", jsonParser, function (req, res) {
  const delItem = req.body;
  phoneBook = phoneBook.filter((el) => el.id !== delItem.id);
  res.json(phoneBook);
});

app.listen(process.env.PORT || 8080);
