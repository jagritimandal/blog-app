const Joi = require('joi');

const userValidation = Joi.object({
  userName: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_\.]{3,20}$/)
    .message('userName must be 3–20 characters and contain only letters, numbers, underscores, or dots.')
    .optional(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$'))
    .message('Password must be at least 8 characters and contain both letters and numbers.')
    .required(),

  name: Joi.string().trim().min(1).required(),

  bio: Joi.string().optional().allow(''),

  avatarUrl: Joi.string().uri().optional().allow(''),

  socialLinks: Joi.object({
    twitter: Joi.string().uri().optional().allow(''),
    github: Joi.string().uri().optional().allow(''),
    facebook: Joi.string().uri().optional().allow('')
  }).optional(),

  role: Joi.string().valid('user', 'admin').optional()
});

module.exports = userValidation;
