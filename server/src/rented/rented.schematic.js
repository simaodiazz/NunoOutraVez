const Joi = require("joi");

const createSchematic = Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    status: Joi.string().valid("pending", "approved", "rejected").required(),
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
