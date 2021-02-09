var express = require('express');
var router = express.Router();

var controleurClasse = require('./../controllers/classe');

router.get('/', controleurClasse.getAll);

/* router.get('/classes', controleurClasse.nom); */

router.post('/new', controleurClasse.new);

router.delete('/:id', controleurClasse.delete);

module.exports = router;
