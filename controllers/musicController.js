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

exports.getAMusic = async (req, res) => {
  try {
    const music = await Music.findById(req.params.id_music);

    // Enregistrez les modifications
    res.status(200);
    res.json(music);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};

exports.updateAMusic = async (req, res) => {
  try {
    // On met à jour les champs du post
    const music = await Music.findByIdAndUpdate(req.params.id_music, req.body, {
      // empêche de renvoyer l'ancien élément dans postman
      new: true,
    });

    // Enregistrez les modifications
    res.status(200);
    res.json(music);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};

exports.deleteAMusic = async (req, res) => {
  try {
    // On met à jour les champs du post
    await Music.findByIdAndDelete(req.params.id_music);

    // Enregistrez les modifications
    res.status(200);
    res.json({ message: "Article supprimer" });
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};
