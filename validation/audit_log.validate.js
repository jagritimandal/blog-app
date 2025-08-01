const Joi = require('joi');

const auditLogValidation = Joi.object({
  action: Joi.string().valid(
    'create_post', 'update_post', 'delete_post',
    'create_post_comment', 'update_post_comment', 'delete_post_comment',
    'like_post', 'unlike_post',
    'follow_user', 'unfollow_user',
    'report_post', 'report_comment',
    'ban_user', 'unban_user',
    'delete_user', 'update_user_profile', 'update_user_role',
    'create_media', 'update_media', 'delete_media',
    'delete_media_comment', 'delete_media_like', 'delete_media_report'
  ).required().messages({
    'any.only': 'Invalid action type',
    'any.required': 'Action is required'
  }),

  targetId: Joi.string().required().messages({
    'string.empty': 'Target ID is required',
    'any.required': 'Target ID is required'
  }),

  targetType: Joi.string().valid('post', 'comment', 'user', 'media', 'report')
    .required().messages({
      'any.only': 'Invalid target type',
      'any.required': 'Target type is required'
    }),

  performedBy: Joi.string().required().messages({
    'string.empty': 'PerformedBy (user) is required',
    'any.required': 'PerformedBy (user) is required'
  }),

  status: Joi.string().valid('success', 'failure').default('success'),

  details: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Details must be under 1000 characters'
  }),

  reason: Joi.string().max(500).optional().allow('').messages({
    'string.max': 'Reason must be under 500 characters'
  }),

  metadata: Joi.object().optional().default({})
});

module.exports = auditLogValidation;
