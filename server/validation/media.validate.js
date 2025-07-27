const Joi = require('joi');

const mediaValidation = Joi.object({
    url: Joi.string().uri().required(),
    type: Joi.string().valid('image', 'video').required()
})
.validate = (data) => {
    return mediaValidation.validate(data);
};

module.exports = mediaValidation;
