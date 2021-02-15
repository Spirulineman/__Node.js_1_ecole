require('dotenv').config();

const router = require('express').Router();
const User = require('../models/User');
//TOKEN_SECRET
const jwt = require('jsonwebtoken');
// hashage du password
const bcrypt = require('bcryptjs');


/* Refactorisation (marche pas ...)===>> const { registerValidation } = require('../validation'); */

// validation du register avec @hapi/joi
const Joi = require('@hapi/joi');

 const schema_Register = Joi.object({
        nom: Joi.string().min(6).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(1)
            .required(),
        password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        /* repeat_password: Joi.ref('password'),
        access_token: [
            Joi.string(),
            Joi.number()
        ], */
 });
    /* Refactorisation (marche pas ...)===>> return schema.validate({data, schema}); */

//   ===================  Register   =======================
router.post('/register', async (req, res) => {

    const { error } = schema_Register.validate(req.body);
    if(error) return res.status(400).send(error.message);

    //  vérifier si le mail existe:

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Votre Email est déjà utilisé !');

    // Validation des champs avant de créer un user
    /* Refactorisation (marche pas ...)===>> const { error } = registerValidation(req.body);
    
    Refactorisation (marche pas ...)===>> if (error) return res.status(400).send(error.message); */

    // hachage du password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // créer un User 
    const user = new User({

        nom: req.body.nom,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        /* res.send(savedUser);  */
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});
//   ===================  /Register   =======================

//   ===================  Login   =======================

const schema_Login = Joi.object({
        
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(1)
            .required(),
        password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        /*,
        access_token: [
            Joi.string(),
            Joi.number()
        ], */
 });

router.post('/login', async (req,res) => {

    const { error } = schema_Login.validate(req.body);
    if(error) return res.status(400).send(error.message);

    //  vérifier si le mail existe:

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email ou password invalide !');

    //PASSWORD est correct ?
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email ou password invalide !') 

    // create and assign access_token
    const token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET )// attention dans le fichier .env ==>> pas d'espace TOKEN_SECRET=secret
    res.header('auth-token', token).send(token);
    
});

//   ===================  /Login   =======================

module.exports = router;