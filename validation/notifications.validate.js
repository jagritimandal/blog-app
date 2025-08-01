const Joi = require('joi');

const notificationValidation = Joi.object({
  userId: Joi.string().required().messages({
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),

  type: Joi.string()
    .valid('comment_reply', 'new_post', 'like', 'follow', 'mention')
    .required()
    .messages({
      'any.only': 'Invalid notification type',
      'any.required': 'Notification type is required'
    }),

  referenceId: Joi.string().required().messages({
    'string.empty': 'Reference ID is required',
    'any.required': 'Reference ID is required'
  }),

  message: Joi.string().trim().required().messages({
    'string.empty': 'Message cannot be empty',
    'any.required': 'Message is required'
  }),

  read: Joi.boolean().default(false),

  metadata: Joi.object().optional() // ✅ Allow extra optional data
});

module.exports = notificationValidation;
