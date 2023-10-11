const express = require("express");
// On va stocker ici toutes les routes
const router = express.Router();

const musicController = require("../controllers/musicController");

router
  .route("/")
  .get(musicController.listAllMusics)
  .post(musicController.createAMusic);

router
  .route("/:id_music")
  .get(musicController.getAMusic)
  .put(musicController.updateAMusic);

module.exports = router;
