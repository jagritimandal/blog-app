const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,  
    ref: 'Post'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref: 'User'
  },
  content: {
    type: String,  
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
      type: Number, 
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