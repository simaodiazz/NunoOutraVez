const Joi = require("joi");

const createSchematic = Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    status: Joi.string().valid("pending", "approved", "rejected"),
    UserId: Joi.string().required(),
    CarId: Joi.string().required()
});

const updateSchematic = Joi.object({
    startDate: Joi.date().iso(),
    endDate: Joi.date().iso(),
    status: Joi.string().valid("pending", "approved", "rejected"),
});

module.exports = {
    createSchematic,
    updateSchematic
};
