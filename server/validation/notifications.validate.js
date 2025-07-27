const Joi = require('joi');

const notifiactionValidation = Joi.object({
    userId: Joi.string().required(),
    type: Joi.string().valid('comment_reply', 'new_post', 'like', 'follow', 'mention').required(),
    referenceId: Joi.string().required(),
    message: Joi.string().required(),
    read: Joi.boolean().default(false)
});

notifiactionValidation.validate = (data) => {
    return notifiactionValidation.validate(data);
};

module.exports = notifiactionValidation;