const express = require("express");
// On va stocker ici toutes les routes
const router = express.Router();

const voteController = require("../controllers/voteController");

router
  .route("/posts/:id_post/votes")
  .get(voteController.listAllVotes)
  .post(voteController.createAVote);

module.exports = router;
