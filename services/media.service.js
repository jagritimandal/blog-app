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
    getMediaByUploader: async (uploaderId) => {
        try {
            return await media.find({ uploaderId });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByCategory: async (categoryId) => {
        try {
            return await media.find({ categoryId });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByType: async (type) => {
        try {
            return await media.find({ type });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByDateRange: async (startDate, endDate) => {
        try {
            return await media.find({
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByTags: async (tags) => {
        try {
            return await media.find({ tags: { $in: tags } });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaBySearch: async (searchTerm) => {
        try {
            const regex = new RegExp(searchTerm, 'i');
            return await media.find({ title: regex });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByPopularity: async () => {
        try {
            return await media.find({}).sort({ likes: -1 });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByRating: async (rating) => {
        try {
            return await media.find({ rating: { $gte: rating } });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByDuration: async (minDuration, maxDuration) => {
        try {
            return await media.find({
                duration: {
                    $gte: minDuration,
                    $lte: maxDuration
                }
            });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByResolution: async (resolution) => {
        try {
            return await media.find({ resolution });
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getMediaByUploaderAndCategory: async (uploaderId, categoryId) => {
        try {
            return await media.find({ uploaderId, categoryId });
        } catch (err) {
            throw new Error(err.message);
        }
    }
};

module.exports = MediaService;
