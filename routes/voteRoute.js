const express = require("express");
// On va stocker ici toutes les routes
const router = express.Router();

const voteController = require("../controllers/voteController");

router
  .route("/musics/:id_music/votes")
  .get(voteController.listAllVotes)
  .post(voteController.createAVote);

// Pour accéder à la moyenne des votes de chaque musiques
router.route("/musics/:id_music/resulte").get(voteController.averageVote);

// Pour accéder à la musique qui possède la moyenne la plus haute
//router.route("/musics/bestMusique").get(voteController.);
router.route("/musics/bestMusique").get(voteController.getBestMusique);

module.exports = router;
