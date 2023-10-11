// On importe mongoose
const mongoose = require("mongoose");
// on acccède à toute les méthodes disponibles de mongoose que l'on stocke dans Schema
const Schema = mongoose.Schema;

// Ici on controle ce qu'on va implémenter dans la base de donnée
let musicSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: "Le contenue est requis",
  },
  forname: {
    type: String,
    required: "Le contenue est requis",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Music", musicSchema);
