
var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');

var controleurEleve = require('./../controllers/eleve');
const User = require('../models/User');

router.get('/', verify, (req, res) => {
    res.send(req.user);
});

router.get('/', controleurEleve.getAll);

router.get('/moyenne', controleurEleve.moyenne);

router.post('/new', controleurEleve.new);

router.delete('/:id', controleurEleve.delete);

module.exports = router;