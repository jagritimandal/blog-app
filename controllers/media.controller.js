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
    getAllMedia: async (req, res) => {
        try {
            const allMedia = await media.getAllMedia();
            return res.status(200).json(allMedia);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getMediaByUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userMedia = await media.getMediaByUser(userId);
            return res.status(200).json(userMedia);
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
    }
};