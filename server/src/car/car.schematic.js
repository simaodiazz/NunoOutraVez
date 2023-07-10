const Joi = require('joi');

const createSchematic = Joi.object({
    id: Joi.string().uuid().required(),
    image: Joi.binary().allow(null),
    name: Joi.string().required(),
    price: Joi.number().required(),
    consume: Joi.number().required(),
    capacity: Joi.number().required(),
    liters: Joi.number().required(),
    km: Joi.number().required()
});

const updateSchematic = Joi.object({
    image: Joi.binary().allow(null),
    name: Joi.string(),
    price: Joi.number(),
    consume: Joi.number(),
    capacity: Joi.number(),
    liters: Joi.number(),
    km: Joi.number()
}).min(1);

module.exports = {
    createSchematic,
    updateSchematic
};
