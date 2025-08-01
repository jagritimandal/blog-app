const media =require('../models/media.model');
const { update } = require('../models/user.model');

const MediaService = {
    uploadMedia: async (mediaData) => {
        try {
            const mediaItem = new media(mediaData);
            await mediaItem.save();
            return mediaItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaById: async (mediaId) => {
        try {
            const mediaItem = await media.findById(mediaId);
            if (!mediaItem) {
                throw new Error('Media not found');
            }
            return mediaItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    updateMedia: async (mediaId, mediaData) => {
        try {
            const mediaItem = await media.findById(mediaId);
            if (!mediaItem) {
                throw new Error('Media not found');
            }
            Object.assign(mediaItem, mediaData);
            await mediaItem.save();
            return mediaItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    deleteMedia: async (mediaId) => {
        try {
            const mediaItem = await media.findById(mediaId);
            if (!mediaItem) {
                throw new Error('Media not found');
            }
            await media.deleteOne({ _id: mediaId });
            return { message: 'Media deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },

    likeMedia: async (mediaId, userId) => {
        try {
            const mediaItem = await media.findById(mediaId);
            if (!mediaItem) {
                throw new Error('Media not found');
            }
            if (!mediaItem.likes) {
                mediaItem.likes = [];
            }
            if (!mediaItem.likes.includes(userId)) {
                mediaItem.likes.push(userId);
                await mediaItem.save();
            }
            return mediaItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    unlikeMedia: async (mediaId, userId) => {
        try {
            const mediaItem = await media.findById(mediaId);
            if (!mediaItem) {
                throw new Error('Media not found');
            }
            if (mediaItem.likes && mediaItem.likes.includes(userId)) {
                mediaItem.likes.pull(userId);
                await mediaItem.save();
            }
            return mediaItem;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    getAllMedia: async () => {
        try {
            return await media.find({});
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByUser: async (userId) => {
        try {
            const userMedia = await media.find({ userId });
            return userMedia;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByPostId: async (postId) => {
        try {
            const mediaList = await media.find({ postId });
            return mediaList;
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

module.exports = MediaService;
