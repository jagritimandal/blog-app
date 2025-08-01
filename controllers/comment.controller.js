const comment = require('../models/comment.model');

const Validation = require('../validation/comment.validation');

const CommentController = {
    createComment: async (req, res) => {
        try {
            const { error } = Validation.createCommentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newComment = await comment.createComment(req.body);
            return res.status(201).json(newComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCommentById: async (req, res) => {
        try {
            const commentId = req.params.id;
            const foundComment = await comment.getCommentById(commentId);
            return res.status(200).json(foundComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { error } = Validation.updateCommentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedComment = await comment.updateComment(commentId, req.body);
            return res.status(200).json(updatedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const deletedComment = await comment.deleteComment(commentId);
            return res.status(200).json(deletedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllComments: async (req, res) => {
        try {
            const allComments = await comment.getAllComments();
            return res.status(200).json(allComments);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCommentsByPostId: async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await comment.getCommentsByPostId(postId);
            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    likeComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const likedComment = await comment.likeComment(commentId);
            return res.status(200).json(likedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    unlikeComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const unlikedComment = await comment.unlikeComment(commentId);
            return res.status(200).json(unlikedComment);
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
    getRepliesByCommentId: async (req, res) => {
        try {
            const commentId = req.params.id;
            const replies = await comment.getRepliesByCommentId(commentId);
            return res.status(200).json(replies);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCommentLikes: async (req, res) => {
        try {
            const commentId = req.params.id;
            const likes = await comment.getCommentLikes(commentId);
            return res.status(200).json(likes);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCommentDislikes: async (req, res) => {
        try {
            const commentId = req.params.id;
            const dislikes = await comment.getCommentDislikes(commentId);
            return res.status(200).json(dislikes);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = CommentController;