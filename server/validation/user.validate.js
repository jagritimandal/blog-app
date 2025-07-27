const Joi = require('joi');

const userValidation = Joi.object({
    userName: Joi.string().trim().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    bio: Joi.string().optional().allow(''),
    avatarUrl: Joi.string().uri().optional().allow(''),
    socialLinks: Joi.object({
        twitter: Joi.string().uri().optional().allow(''),
        github: Joi.string().uri().optional().allow(''),
        facebook: Joi.string().uri().optional().allow('')
    }).optional(),
    role: Joi.string().valid('user', 'admin').optional()
});

module.exports =userValidation;
