const router = require('express').Router();
const User = require('../models/User');

/* Refactorisation (marche pas ...)===>> const { registerValidation } = require('../validation'); */

// validation avec @hapi/joi
const Joi = require('@hapi/joi');


 const schema = Joi.object({
        nom: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
 });
    /* Refactorisation (marche pas ...)===>> return schema.validate({data, schema}); */


router.post('/register', async (req, res) => {

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.message);

    //  vérifier si le mail existe:

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Votre Email est déjà utilisé !');

    // Validation des champs avant de créer un user
    /* Refactorisation (marche pas ...)===>> const { error } = registerValidation(req.body);
    
    Refactorisation (marche pas ...)===>> if (error) return res.status(400).send(error.message); */

    const user = new User({

        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = router;