const comment = require('../services/comment.service')
const Validation = require('../validation/comment.validation');

const CommentController = {
    addComment: async (req, res) => {
        try {
            const { error } = Validation.createCommentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newComment = await comment.addComment(req.body);
            return res.status(201).json(newComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    replyToComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { error } = Validation.replyToCommentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const repliedComment = await comment.replyToComment(commentId, req.body);
            return res.status(201).json(repliedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    editComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { error } = Validation.updateCommentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedComment = await comment.editComment(commentId, req.body);
            return res.status(200).json(updatedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const deletedComment = await comment.deleteComment(commentId);
            return res.status(200).json(deletedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    likeComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const likedComment = await comment.likeComment(commentId, req.user.id);
            return res.status(200).json(likedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    adminOnlyDeleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const deletedComment = await comment.deleteComment(commentId);
            return res.status(200).json(deletedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = CommentController;