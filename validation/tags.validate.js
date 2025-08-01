const Joi = require('joi');

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const tagsValidation = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Tag name is required',
    'any.required': 'Tag name is required'
  }),

  slug: Joi.string().trim().pattern(slugRegex).required().messages({
    'string.pattern.base': 'Slug must be lowercase and URL-friendly (e.g., "my-tag")',
    'string.empty': 'Slug is required',
    'any.required': 'Slug is required'
  }),

  description: Joi.string().trim().allow('').optional().messages({
    'string.base': 'Description must be a string'
  })
});

module.exports = tagsValidation;
