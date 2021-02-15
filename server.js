const express = require('express');
const app = express();

const dotenv = require('dotenv');
var mongoose = require('mongoose');
// Authentification import 
const authRoute = require('./routes/auth');

var bodyParser = require('body-parser');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));

//Connexion BDD

var db = require('./db.js');
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true },
    { useNewUrlParser: true }, );
    

/** ==============   Routes   ===========================*/

var routeEleves = require('./routes/eleve'); //Middleware eleve
app.use('/eleves', routeEleves);

var routeClasses = require('./routes/classe'); //Middleware classe
app.use('/classes', routeClasses);

app.use(express.json());


app.use('/app/user', authRoute);//Middleware User


/** ==================   /Routes   ====================== */

app.get('/', (req, res) => { res.send('Hello world'); } );
/*app.get('/', function (req, res) {
    res.send('Hello world !');
});*/


app.listen(3000, () => console.log('En écoute sur le port 3000 et envoi sur le port 27017 de MongoDb'));