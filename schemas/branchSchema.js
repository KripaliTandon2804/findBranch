const Joi = require('joi')

const branch = Joi.object({
    branchId: Joi.string(),
    branchName: Joi.string().min(3).required(),
    income: Joi.number().required(),
    city: Joi.string().min(3).required(),
    branchAddress: Joi.string().min(5),
    lat: Joi.number().min(-180).max(180).required(),
    long: Joi.number().min(-90).max(90).required()
})

module.exports = branch;
