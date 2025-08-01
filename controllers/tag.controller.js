const { update } = require('../models/user.model');
const TagService = require('../services/tag.service');
const Validation = require('../validation/tag.validation');

const TagController = {
    createTag: async (req, res) => {
        try {
            const { error } = Validation.createTagValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newTag = await TagService.createTag(req.body);
            return res.status(201).json(newTag);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getTagById: async (req, res) => {
        try {
            const { error } = Validation.getTagByIdValidation(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const tag = await TagService.getTagById(req.params.id);
            return res.status(200).json(tag);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateTag: async (req, res) => {
        try {
            const { error } = Validation.updateTagValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedTag = await TagService.updateTag(req.params.id, req.body);
            return res.status(200).json(updatedTag);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteTag: async (req, res) => {
        try {
            const { error } = Validation.deleteTagValidation(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const deletedTag = await TagService.deleteTag(req.params.id);
            return res.status(200).json(deletedTag);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllTags: async (req, res) => {
        try {
            const tags = await TagService.getAllTags();
            return res.status(200).json(tags);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    addTagToPost: async (req, res) => {
        try {
            const { postId, tagId } = req.body;
            const post = await TagService.addTagToPost(postId, tagId);
            return res.status(200).json(post);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    removeTagFromPost: async (req, res) => {
        try {
            const { postId, tagId } = req.body;
            const post = await TagService.removeTagFromPost(postId, tagId);
            return res.status(200).json(post);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByTag: async (req, res) => {
        try {
            const { tagId } = req.params;
            const posts = await TagService.getPostsByTag(tagId);
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = TagController;