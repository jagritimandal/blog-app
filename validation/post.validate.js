const Joi = require('joi');

const postValidation = Joi.object({
  title: Joi.string().trim().required(),
  slug: Joi.string().trim().required(), // Unique check done elsewhere
  content: Joi.string().trim().required(),
  authorId: Joi.string().required(), // Use `.custom()` if validating ObjectId format

  tags: Joi.array().items(Joi.string().trim().lowercase()).optional(),

  categories: Joi.array().items(Joi.string().required()).min(1).required(),

  media: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      type: Joi.string().valid('image', 'video').required()
    })
  ).optional(),

  views: Joi.number().min(0).optional(),

  status: Joi.string().valid('published', 'draft', 'archived').required(),
  publishedAt: Joi.date().allow(null).optional(),
  deletedAt: Joi.date().allow(null).optional(),

  // Forbidden fields (handled internally)
  reactions: Joi.forbidden(),
  comments: Joi.forbidden(),
  createdAt: Joi.forbidden(),
  updatedAt: Joi.forbidden()
});
module.exports = postValidation;