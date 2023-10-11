const Music = require("../models/musicModel");

exports.listAllMusics = async (req, res) => {
  try {
    // On retourne tous les documents de mongoDB
    const musics = await Music.find({});
    // ON renvoie le status
    res.status(200);
    //On renvoie le résultat
    res.json(musics);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};
