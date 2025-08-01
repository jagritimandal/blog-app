const media = require('../models/media.model');

const validation = require('../validation/media.validation');

const MediaController = {
    uploadMedia: async (req, res) => {
        try {
            const { error } = validation.uploadMediaValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newMedia = await media.uploadMedia(req.body);
            return res.status(201).json(newMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getMediaById: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const foundMedia = await media.getMediaById(mediaId);
            return res.status(200).json(foundMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateMedia: async (req, res) => {  
        try {
            const mediaId = req.params.id;
            const { error } = validation.updateMediaValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedMedia = await media.updateMedia(mediaId, req.body);
            return res.status(200).json(updatedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteMedia: async (req, res) => {  
        try {
            const mediaId = req.params.id;
            const deletedMedia = await media.deleteMedia(mediaId);
            return res.status(200).json(deletedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllMedia: async (req, res) => {
        try {
            const allMedia = await media.getAllMedia();
            return res.status(200).json(allMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getMediaByPostId: async (req, res) => {
        try {
            const postId = req.params.postId;
            const mediaList = await media.getMediaByPostId(postId);
            return res.status(200).json(mediaList);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    likeMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const likedMedia = await media.likeMedia(mediaId);
            return res.status(200).json(likedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    unlikeMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const unlikedMedia = await media.unlikeMedia(mediaId);
            return res.status(200).json(unlikedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    shareMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const sharedMedia = await media.shareMedia(mediaId);
            return res.status(200).json(sharedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    commentOnMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const { error } = validation.commentOnMediaValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const commentedMedia = await media.commentOnMedia(mediaId, req.body);
            return res.status(200).json(commentedMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCommentsOnMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const comments = await media.getCommentsOnMedia(mediaId);
            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    likeCommentOnMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const commentId = req.params.commentId;
            const likedComment = await media.likeCommentOnMedia(mediaId, commentId);
            return res.status(200).json(likedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    unlikeCommentOnMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const commentId = req.params.commentId;
            const unlikedComment = await media.unlikeCommentOnMedia(mediaId, commentId);
            return res.status(200).json(unlikedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    shareCommentOnMedia: async (req, res) => {
        try {
            const mediaId = req.params.id;
            const commentId = req.params.commentId;
            const sharedComment = await media.shareCommentOnMedia(mediaId, commentId);
            return res.status(200).json(sharedComment);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    
};