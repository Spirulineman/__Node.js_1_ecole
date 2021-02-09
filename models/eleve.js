var mongoose = require('mongoose');

module.exports = mongoose.model('Eleve', {
    prenom : {type : String, default: ''},
    nom : {type : String, default: ''},
    dateNaissance : {type : Date},
    moyenne: {type: Number, default: 0},
    appreciation: {type: String, default: ''},
    classe: {type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }
});