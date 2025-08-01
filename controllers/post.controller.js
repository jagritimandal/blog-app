const post = require('../models/post.model');
const { viewSinglePost, filterByChategoriesOrTags, draftPost, markdownToHtml } = require('../services/post.service');
const Validation = require('../validation/post.validation');

const PostController = {
    createPost: async (req, res) => {
        try {
            const { error } = Validation.createPostValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newPost = await post.createPost(req.body);
            return res.status(201).json(newPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    
    updatePost: async (req, res) => {   
        try {
            const postId = req.params.id;
            const { error } = Validation.updatePostValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedPost = await post.updatePost(postId, req.body);
            return res.status(200).json(updatedPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const deletedPost = await post.deletePost(postId);
            return res.status(200).json(deletedPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    viewSinglePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const postDetails = await viewSinglePost(postId);
            return res.status(200).json(postDetails);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllPosts: async (req, res) => {  
        try {
            const allPosts = await post.getAllPosts();
            return res.status(200).json(allPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostById: async (req, res) => {
        try {
            const postId = req.params.id;
            const foundPost = await post.getPostById(postId);
            return res.status(200).json(foundPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    likePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const likedPost = await post.likePost(postId, req.user.id);
            return res.status(200).json(likedPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    commentOnPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const { error } = Validation.commentValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const commentedPost = await post.commentOnPost(postId, req.body, req.user.id);
            return res.status(200).json(commentedPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    sharePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const sharedPost = await post.sharePost(postId, req.user.id);
            return res.status(200).json(sharedPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const userPosts = await post.getPostsByUser(userId);
            return res.status(200).json(userPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getTrendingPosts: async (req, res) => {
        try {
            const trendingPosts = await post.getTrendingPosts();
            return res.status(200).json(trendingPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    filterByChategoriesOrTags: async (req, res) => {
        try {
            const filter = req.query;
            const filteredPosts = await filterByChategoriesOrTags(filter);
            return res.status(200).json(filteredPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByCategory: async (req, res) => {
        try {
            const category = req.params.category;
            const postsByCategory = await post.getPostsByCategory(category);
            return res.status(200).json(postsByCategory);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    slugBasedUrl: async (req, res) => {
        try {
            const slug = req.params.slug;
            const postBySlug = await post.slugBasedUrl(slug);
            return res.status(200).json(postBySlug);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const userPosts = await post.getPostsByUser(userId);
            return res.status(200).json(userPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByTag: async (req, res) => {
        try {
            const tag = req.params.tag;
            const postsByTag = await post.getPostsByTag(tag);
            return res.status(200).json(postsByTag);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    draftPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const draftPost = await post.draftPost(postId);
            return res.status(200).json(draftPost);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    markdownToHtml: async (req, res) => {
        try {
            const markdownText = req.body.markdown;
            const htmlContent = await post.markdownToHtml(markdownText);
            return res.status(200).json({ html: htmlContent });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = PostController;