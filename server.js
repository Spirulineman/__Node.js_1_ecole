const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//Connexion BDD
var db = require('./db.js');
mongoose.connect(db.url);

/** ==============   Routes   ===========================*/

var routeEleves = require('./routes/eleve'); //Middleware
app.use('/eleves', routeEleves);

var routeClasses = require('./routes/classe'); //Middleware
app.use('/classes', routeClasses);

/** ==================   /Routes   ====================== */

app.get('/', (req, res) => { res.send('Hello world'); } );
/*app.get('/', function (req, res) {
    res.send('Hello world !');
});*/


app.listen(3000, () => console.log('En écoute sur le port 3000 et envoi sur le port 27017 de MongoDb'));