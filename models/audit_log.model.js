const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: [
      'create_post', 'update_post', 'delete_post',
      'create_post_comment', 'update_post_comment', 'delete_post_comment',
      'like_post', 'unlike_post',
      'follow_user', 'unfollow_user',
      'report_post', 'report_comment',
      'ban_user', 'unban_user',
      'delete_user', 'update_user_profile', 'update_user_role',
      'create_media', 'update_media', 'delete_media',
      'delete_media_comment', 'delete_media_like', 'delete_media_report'
    ]
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
    // 👇 We don't set a fixed `ref` because `targetType` varies across models
  },
  targetType: {
    type: String,
    required: true,
    enum: ['post', 'comment', 'user', 'media', 'report']
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  status: {
  type: String,
  enum: ['success', 'failure'],
  default: 'success'
  },
  details: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: ''
  },
  reason: {
    type: String,
    trim: true,
    maxlength: 500,
    default: ''
  },
  metadata: {
  type: mongoose.Schema.Types.Mixed,
  default: {}
  }

}, {
  timestamps: true
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;
