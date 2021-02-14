// Refactorisation (marche pas ...)===>> validation avec @hapi/joi 
const Joi = require('@hapi/joi');

// validation register
const registerValidation = (data) => {
    const schema = Joi.object({
        nom: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate({data, schema});
};

// validation login
/* const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate({data, schema}); 
}; */

module.exports.registerValidation = registerValidation;
/* module.exports.loginValidation = loginValidation; */