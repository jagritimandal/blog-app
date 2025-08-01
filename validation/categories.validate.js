const Joi = require('joi');

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // for SEO-friendly slugs

const categoriesValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Category name is required',
    'any.required': 'Category name is required'
  }),

  slug: Joi.string().trim().pattern(slugRegex).required().messages({
    'string.pattern.base': 'Slug must be URL-friendly and lowercase (e.g., "my-category")',
    'any.required': 'Slug is required',
    'string.empty': 'Slug cannot be empty'
  }),

  description: Joi.string().trim().optional().allow('').messages({
    'string.base': 'Description must be a string'
  })
});

module.exports = categoriesValidation;
