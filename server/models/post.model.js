const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({  // 🛠️ Fixed: mongoose.Schema (not lowercase)
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'  // 🛠️ Capitalized model name for consistency
  }],
  media: [{
    url: {
      type: String
    },
    type: {
      type: String,
      enum: ['image', 'video']
    }
  }],
  reactions: {
    likes: {
      type: Number,
      default: 0
    }
  },
  views: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],  // 🛠️ Changed 'default' to 'draft'
    default: 'draft'
  },
  publishedAt: {
    type: Date,  // 🛠️ Fixed: lowercase 'date' was undefined
    default: null
  }
}, {
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;  // 🛠️ Fixed: typo `model.exports` → `module.exports`
