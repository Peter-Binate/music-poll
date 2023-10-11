const express = require("express");
const app = express();
const port = 3000;

// On se connecte à la base de donnée
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/apinode"); // Avec une installation local de mongodb

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const musicRoute = require("./routes/musicRoute");
app.use("/musics", musicRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
