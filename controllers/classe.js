var Classe = require('./../models/classe.js');
var controller = {};

controller.getAll = (req, res) => {
    Classe.find((err, classes) => {
        if (err) {
            res.send(err);
        }
        res.json(classes);
    });
};

controller.new = (req, res) => {
    var classe = new Classe();

    classe.nom = req.body.nom;
    classe.eleves = req.body.eleves;
    classe.save((err) => {
        if (err) { res.send(err); }
        res.json({message : "ok"});
    });
}

controller.delete = (req, res) => {
    Classe.deleteOne({_id: req.params.id}, (err) => {
        if (err) { res.send(err) }
        res.json({ message: "Classe supprimée !"});
    });
}

/* controller.moyenne = (req, res) => {
    //.... calcul moyennes
    res.json({message: "moyenne"});
} */

module.exports = controller;