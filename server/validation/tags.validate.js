const Joi = require('joi');

const tagsValidation = Joi.object({
    name: Joi.string().trim().required(),
    slug: Joi.string().trim().required(),
    description: Joi.string().trim().optional().allow('')
})
.validate = (data) => {
    return tagsValidation.validate(data);
};

module.exports = tagsValidation;
