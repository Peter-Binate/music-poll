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

exports.createAMusic = async (req, res) => {
  const newMusic = new Music(req.body);

  try {
    // On insère les données dans la base de donnée
    const music = await newMusic.save();
    res.status(201).json(music);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};