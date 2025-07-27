const Joi = require('joi');

const auditLogValidation = Joi.object({
    action: Joi.string().required(),
    targetId: Joi.string().required(),
    targetType: Joi.string().required(),
    performedBy: Joi.string().required()
});
module.exports = auditLogValidation;
