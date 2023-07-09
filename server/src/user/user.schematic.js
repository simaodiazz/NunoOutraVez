const Joi = require("joi");

const createSchematic = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
});

const updateSchematic = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
});

module.exports = {
    createSchematic,
    updateSchematic
}
