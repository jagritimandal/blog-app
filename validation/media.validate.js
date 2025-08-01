const Joi = require('joi');

const mediaValidation = Joi.object({
  url: Joi.string().uri().required().messages({
    'string.uri': 'Media URL must be a valid URI',
    'any.required': 'Media URL is required'
  }),

  uploaderId: Joi.string().required().messages({
    'string.empty': 'Uploader ID is required',
    'any.required': 'Uploader ID is required'
  }),

  type: Joi.string().valid('image', 'video').required().messages({
    'any.only': 'Type must be either "image" or "video"',
    'any.required': 'Media type is required'
  }),

  size: Joi.number().min(0).required().messages({
    'number.base': 'Size must be a number',
    'any.required': 'File size is required'
  }),

  altText: Joi.string().max(500).trim().optional().allow('')
});

module.exports = mediaValidation;
