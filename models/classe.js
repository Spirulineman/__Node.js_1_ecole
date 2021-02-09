var mongoose = require('mongoose');

module.exports = mongoose.model('Classe', {
    nom : {type : String, default: ''},
    eleves : [{type: mongoose.Schema.Types.ObjectId, ref: 'Eleve'}]
});