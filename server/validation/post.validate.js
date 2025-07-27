const Joi = require('joi');

const postValidation = Joi.object({
  title: Joi.string().trim().required(),
  slug: Joi.string().trim().required(), // 🔥 Removed `.unique()`
  content: Joi.string().trim().required(),
  authorId: Joi.string().required(),

  tags: Joi.array().items(Joi.string()).optional(),

  categories: Joi.array().items(Joi.string().required()).required(),

  media: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      type: Joi.string().valid('image', 'video').required()
    })
  ).optional(),

  reactions: Joi.object({
    likes: Joi.number().min(0)
  }).optional(),

  comments: Joi.array().items(Joi.string()).optional(),

  views: Joi.number().min(0).optional(),

  isPublished: Joi.boolean().optional(),

  status: Joi.string().valid('published', 'draft', 'archived').required(),  // 🔥 "draft" not "default"

  publishedAt: Joi.date().allow(null).optional(),
  deletedAt: Joi.date().allow(null).optional(),
  createdAt: Joi.date().default(() => new Date(), 'time now'),
  updatedAt: Joi.date().default(() => new Date(), 'time now')
});
