const tag = require('../models/tag.model');

const TagService = {
    createTag: async (tagData) => {
        const newTag = new tag(tagData);
        await newTag.save();
        return newTag;
    },
    getTagById: async (tagId) => {
        const foundTag = await tag.findById(tagId);
        if (!foundTag) throw new Error('Tag not found');
        return foundTag;
    },
    updateTag: async (tagId, updateData) => {
        const updatedTag = await tag.findByIdAndUpdate(tagId, updateData, { new: true });
        if (!updatedTag) throw new Error('Tag not found');
        return updatedTag;
    },
    deleteTag: async (tagId) => {
        const deletedTag = await tag.findByIdAndDelete(tagId);
        if (!deletedTag) throw new Error('Tag not found');
        return deletedTag;
    },
    getAllTags: async () => {
        return await tag.find();
    },
    addTagToPost: async (postId, tagId) => {
        const Post = require('../models/post.model');
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        if (!post.tags.includes(tagId)) {
            post.tags.push(tagId);
            await post.save();
        }

        return post;
    },
    removeTagFromPost: async (postId, tagId) => {
        const Post = require('../models/post.model');
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');

        post.tags = post.tags.filter(id => id.toString() !== tagId);
        await post.save();

        return post;
    },
    getPostsByTag: async (tagId) => {
        const Post = require('../models/post.model');
        return await Post.find({ tags: tagId });
    }
};

module.exports = TagService;