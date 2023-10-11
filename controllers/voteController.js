const Vote = require("../models/voteModel");
const Music = require("../models/musicModel");

exports.listAllVotes = async (req, res) => {
  // Méthode asynchrone best pratique
  try {
    // On retourne tous les documents de mongoDB
    const votes = await Vote.find({ music_id: req.params.id_music });
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
    const music = await Music.findById(req.params.id_music);

    // On place le commentaire dans le post_id qui lui correspond
    const newVote = new Vote({
      ...req.body,
      music_id: req.params.id_music,
    });

    const musicCreationDate = music.created_at.toISOString().slice(0, 10);
    try {
      // On insère les données dans la base de donnée
      const vote = await newVote.save();

      const voteCreationDate = vote.created_at.toISOString().slice(0, 10);
      if (musicCreationDate === voteCreationDate) {
        res.status(201).json(vote);
      } else {
        res.json({
          message:
            "Vous devez voter le même jour que la publication de cette musique!",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Votre vote doit être compris entre 1 et 5" });
    }
  } catch (error) {
    res.status(500).json({
      message: "La musique pour laquelle vous voulez voter est inexistante",
    });
  }
};

// On calcule la moyenne des votes de chaque musiques
exports.averageVote = async (req, res) => {
  try {
    const music_id = req.params.id_music;

    // Récupérez tous les votes associés à une musique spécifique
    const votes = await Vote.find({ music_id: req.params.id_music });

    if (votes.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun vote trouvé pour cette musique." });
    }

    // Calculez la moyenne des votes
    const totalVotes = votes.length;
    const totalScore = votes.reduce((acc, vote) => acc + vote.vote_rating, 0);
    const averageVote = totalScore / totalVotes;

    res.status(200).json({ music_id, averageVote });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// On récupère la musique qui a le plus de votes
exports.getBestMusic = async (req, res) => {
  try {
    const allMusics = await Music.find({});

    if (allMusics.length === 0) {
      return res.status(404).json({ message: "Aucune musique trouvée." });
    }

    let highestAverageVote = -1;
    let bestMusique = null;

    for (const music of allMusics) {
      const votes = await Vote.find({ music_id: req.params.id_music });

      if (votes.length > 0) {
        const totalVotes = votes.length;
        const totalScore = votes.reduce(
          (acc, vote) => acc + vote.vote_rating,
          0
        );
        const averageVote = totalScore / totalVotes;

        if (averageVote > highestAverageVote) {
          highestAverageVote = averageVote;
          bestMusique = music;
        }
      }
    }

    if (bestMusique) {
      res.status(200).json(bestMusique);
    } else {
      res.status(404).json({ message: "Aucune musique n'a de votes." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
