
var express = require('express');
var router = express.Router();

var controleurEleve = require('./../controllers/eleve');

router.get('/', controleurEleve.getAll);
router.get('/moyenne', controleurEleve.moyenne);

router.post('/new', controleurEleve.new);

router.delete('/:id', controleurEleve.delete);

module.exports = router;