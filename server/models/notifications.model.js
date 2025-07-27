const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId:{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  type:{
    type: String,
    enum: ['comment_reply', 'new_post','like','follow','mention'],
    required: true
  },
  referenceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  message:{
    type:String,
    required: true,
    trim: true
  },
  read:{
    trye: Boolean,
    default: false
  }
},{
  timestamps: true
})

const Notification = mongoose.model('Notification', nitifactionSchema);
module.exports = Notification;
