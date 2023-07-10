const Joi = require('joi');

const createSchematic = Joi.object({
    id: Joi.string().uuid(),
    imageUrl: Joi.binary().allow(null),
    name: Joi.string().required(),
    year: Joi.string().required(),
    price: Joi.string().required(),
    fuel: Joi.string().required(),
    personCapacity: Joi.string().required(),
    maxLiters: Joi.string().required(),
    km: Joi.string().required()
});

const updateSchematic = Joi.object({
    imageUrl: Joi.binary().allow(null),
    name: Joi.string(),
    year: Joi.string(),
    price: Joi.string(),
    fuel: Joi.string(),
    personCapacity: Joi.string(),
    maxLiters: Joi.string(),
    km: Joi.string()
}).min(1);

module.exports = {
    createSchematic,
    updateSchematic
};
