const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  altText: {
    type: String,
    trim: true,
    default: '',
    maxlength: 500
  }
}, {
  timestamps: true
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
