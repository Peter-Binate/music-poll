const mongoose = require("mongoose");
// on acccède à toute les méthodes disponibles de mongoose que l'on stocke dans Schema
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  vote_rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  music_id: {
    type: String,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
