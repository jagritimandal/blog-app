const Joi = require('joi');

const isObjectId = (value, helpers) => {
  return /^[0-9a-fA-F]{24}$/.test(value)
    ? value
    : helpers.error('any.invalid');
};

const commentValidation = Joi.object({
  postId: Joi.string().custom(isObjectId).required().messages({
    'string.empty': 'Post ID is required',
    'any.required': 'Post ID is required',
    'any.invalid': 'Invalid Post ID'
  }),

  authorId: Joi.string().custom(isObjectId).required().messages({
    'string.empty': 'Author ID is required',
    'any.required': 'Author ID is required',
    'any.invalid': 'Invalid Author ID'
  }),

  content: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Content is required',
    'any.required': 'Content is required',
    'string.min': 'Content cannot be empty'
  }),

  parentId: Joi.string().custom(isObjectId).allow(null).optional().messages({
    'any.invalid': 'Invalid Parent ID'
  }),

  // depth is calculated on server
  depth: Joi.forbidden(),

  // reactions should not be client controlled
  reactions: Joi.forbidden(),

  // createdAt is handled by the server
  createdAt: Joi.forbidden()
});
module.exports = commentValidation;