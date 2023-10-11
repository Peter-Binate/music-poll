const Vote = require("../models/voteModel");
const Music = require("../models/musicModel");

exports.listAllVotes = async (req, res) => {
  // Méthode asynchrone best pratique
  try {
    // On retourne tous les documents de mongoDB
    const votes = await Comment.find({ post_id: req.params.id_music });
    // ON renvoie le status
    res.status(200);
    //On renvoie le résultat
    res.json(votes);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};

exports.createAVote = async (req, res) => {
  try {
    // Si le post existe
    await Music.findById(req.params.id_music);

    // On place le commentaire dans le post_id qui lui correspond
    const newVote = new Vote({
      ...req.body,
      music_id: req.params.id_music,
    });

    try {
      // On insère les données dans la base de donnée
      const vote = await newVote.save();
      res.status(201).json(vote);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur (db)." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur (music inexistant)." });
  }
};

exports.getAVote = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id_vote);

    if (vote) {
      // Enregistrez les modifications
      res.status(200);
      res.json(vote);
    } else {
      res.status(204);
      console.log(error);
      res.json({ message: "0 vote" });
    }
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ message: "Erreur serveur" });
  }
};
