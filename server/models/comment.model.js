const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,  // 🛠️ Fixed typo: "reuired" → "required"
    ref: 'Post'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,  // 🛠️ Fixed: "aurhorId" → "authorId"
    required: true,
    ref: 'User'
  },
  content: {
    type: String,  // 🛠️ Fixed typo: "constent" → "content"
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Comment'
  },
  depth: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },
  reactions: {
    likes: {
      type: Number,  // 🛠️ Fixed typo: "types" → "type"
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
// This code defines a Mongoose schema for comments in a blogging platform.
// It includes fields for post ID, author ID, content, parent comment ID, depth of