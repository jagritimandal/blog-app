const Joi = require('joi');

const categoriesValidation = Joi.object({
    name: Joi.string().trim().required(),
    slug: Joi.string().trim().required(),
    description: Joi.string().trim().optional().allow('')
})
.validate = (data) => {
    return categoriesValidation.validate(data);
};

module.exports = categoriesValidation;
