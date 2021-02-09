var Eleve = require('./../models/eleve.js');
var controller = {};

controller.getAll = (req, res) => {
    Eleve.find((err, eleves) => {
        if (err) {
            res.send(err);
        }
        res.json(eleves);
    });
};

controller.new = (req, res) => {
    var eleve = new Eleve();

    eleve.nom = req.body.nom;
    eleve.prenom = req.body.prenom;
    eleve.save((err) => {
        if (err) { res.send(err); }
        res.json({message : "ok"});
    });
}

controller.delete = (req, res) => {
    Eleve.deleteOne({_id: req.params.id}, (err) => {
        if (err) { res.send(err) }
        res.json({ message: "suppr"});
    });
}

controller.moyenne = (req, res) => {
    //.... calcul moyennes
    res.json({message: "moyenne"});
}

module.exports = controller;