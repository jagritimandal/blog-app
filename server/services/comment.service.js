const Comment = require('../models/comment.model');

const CommentService = {
    addComment: async (postId, userId, commentData) => {
        try {
            const comment = new Comment({
                post: postId,
                user: userId,
                ...commentData
            });
            await comment.save();
            return comment;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    replyToComment: async (commentId, userId, replyData) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            const reply = new Comment({
                post: comment.post,
                user: userId,
                parentId: commentId,
                ...replyData
            });
            await reply.save();
            return reply;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    editComment: async (commentId, commentData) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            Object.assign(comment, commentData);
            await comment.save();
            return comment;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    deleteComment: async (commentId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            await Comment.deleteOne({ _id: commentId });
            return { message: 'Comment deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    likeComment: async (commentId, userId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            if (comment.likes.includes(userId)) {
                comment.likes.pull(userId);
            } else {
                comment.likes.push(userId);
            }
            await comment.save();
            return comment;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    adminOnlyDeleteComment: async (commentId) => {
        try {
            const comment = await Comment.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }        
            await Comment.deleteOne({ _id: commentId });
            return { message: 'Comment deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

module.exports = CommentService;