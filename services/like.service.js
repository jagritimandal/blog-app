const like = require('../models/like.model');
const AuditLog = require('../models/audit_log.model');

const LikeService = {
    likePost: async (postId, userId) => {
        try {
            const existingLike = await like.findOne({ post: postId, user: userId });
            if (existingLike) {
                throw new Error('You have already liked this post');
            }
            const newLike = new like({ post: postId, user: userId });
            await newLike.save();

            // Log the like action
            const auditLog = new AuditLog({
                action: 'like',
                entityType: 'post',
                entityId: postId,
                userId: userId
            });
            await auditLog.save();

            return newLike;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    unlikePost: async (postId, userId) => { 
        try {
            const existingLike = await like.findOne({ post: postId, user: userId });
            if (!existingLike) {
                throw new Error('You have not liked this post');
            }
            await like.deleteOne({ _id: existingLike._id });

            // Log the unlike action
            const auditLog = new AuditLog({
                action: 'unlike',
                entityType: 'post',
                entityId: postId,
                userId: userId
            });
            await auditLog.save();

            return { message: 'Post unliked successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    likeComment: async (commentId, userId) => {
        try {
            const existingLike = await like.findOne({ comment: commentId, user: userId });
            if (existingLike) {
                throw new Error('You have already liked this comment');
            }
            const newLike = new like({ comment: commentId, user: userId });
            await newLike.save();

            // Log the like action
            const auditLog = new AuditLog({
                action: 'like',
                entityType: 'comment',
                entityId: commentId,
                userId: userId
            });
            await auditLog.save();

            return newLike;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    unlikeComment: async (commentId, userId) => {   
        try {
            const existingLike = await like.findOne({ comment: commentId, user: userId });
            if (!existingLike) {
                throw new Error('You have not liked this comment');
            }
            await like.deleteOne({ _id: existingLike._id });

            // Log the unlike action
            const auditLog = new AuditLog({
                action: 'unlike',
                entityType: 'comment',
                entityId: commentId,
                userId: userId
            });
            await auditLog.save();

            return { message: 'Comment unliked successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },  
};

module.exports = LikeService;