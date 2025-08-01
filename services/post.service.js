const { updatePost, likePost, commentOnPost, sharePost, getTrendingPosts } = require('../controllers/post.controller');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const PostService = {
    createPost:async (userId, postData) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const post = new Post({
                ...postData,

            });
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    updatePost : async (postId, postData) => {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            Object.assign(post, postData);
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }

    },
    deletePost: async (postId) => {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            await Post.deleteOne({ _id: postId });
            return { message: 'Post deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    viewSinglePost: async (postId) => {
        try {
            const post = await Post.findById(postId).populate('user', 'username');
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getAllPosts: async () => {
        try {
            const posts = await Post.find().populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostById: async (postId) => {
        try {
            const post = await Post.findById(postId).populate('user', 'username');
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    likePost: async (postId, userId) => {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter(id => id.toString() !== userId.toString());
            } else {
                post.likes.push(userId);
            }
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    commentOnPost: async (postId, userId, commentData) => {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const comment = {
                user: userId,
                text: commentData.text
            };
            post.comments.push(comment);
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    sharePost: async (postId, userId) => {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            post.shares.push(userId);
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostByUser: async (userId) => {
        try {
            const posts = await Post.find({ user: userId }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getTrendingPosts: async () => {
        try {
            const posts = await Post.find().sort({ likes: -1 }).limit(10).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    filterByChategoriesOrTags: async (filter) => {
        try {
            const posts = await Post.find({
                $or: [
                    { categories: { $in: filter.categories } },
                    { tags: { $in: filter.tags } }
                ]
            }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByCategory: async (category) => {
        try {
            const posts = await Post.find({ categories: category }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    slugBasedUrl: async (slug) => {
        try {
            const post = await Post.findOne({ slug }).populate('user', 'username');
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByUser: async (userId) => {
        try {
            const posts = await Post.find({ user: userId }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByTag: async (tag) => {
        try {
            const posts = await Post.find({ tags: tag }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    draftPost: async (userId, postData) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const post = new Post({
                ...postData,
                status: 'draft',
                user: userId
            });
            await post.save();
            return post;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    markdownToHtml: async (markdownContent) => {
        try {
            const htmlContent = markdownContent; // Placeholder for actual markdown to HTML conversion logic
            return htmlContent;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
module.exports = PostService;