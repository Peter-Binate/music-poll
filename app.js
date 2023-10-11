const express = require("express");
const app = express();
const port = 3000;

// On se connecte à la base de donnée
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/apinode"); // Avec une installation local de mongodb

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
