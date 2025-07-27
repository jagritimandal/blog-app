const Joi = require('joi');

const commentValidation = Joi.object({
  postId: Joi.string().required().messages({
    'string.empty': 'Post ID is required',
    'any.required': 'Post ID is required'
  }),

  content: Joi.string().required().messages({
    'string.empty': 'Content is required',
    'any.required': 'Content is required'
  }),

  authorId: Joi.string().required().messages({
    'string.empty': 'Author ID is required',
    'any.required': 'Author ID is required'
  }),

  parentId: Joi.string().allow(null).optional().messages({
    'string.empty': 'Parent ID is required'
  }),

  depth: Joi.number().integer().min(0).max(3).default(0).messages({
    'number.base': 'Depth must be a number',
    'number.integer': 'Depth must be an integer',
    'number.min': 'Depth must be at least 0',
    'number.max': 'Depth must be at most 3'
  }),

  reactions: Joi.object({
    likes: Joi.number().integer().min(0).default(0).messages({
      'number.base': 'Likes must be a number',
      'number.integer': 'Likes must be an integer'
    })
  }).default({ likes: 0 }),

  createdAt: Joi.date().default(() => new Date(), 'time of creation').messages({
    'date.base': 'CreatedAt must be a valid date'
  })
});

module.exports = commentValidation;
