const Joi = require('joi')

const register = Joi.object({
    userName: Joi.string().alphanum().min(3).required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

module.exports = register;