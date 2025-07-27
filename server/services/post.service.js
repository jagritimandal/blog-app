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
    editPost : async (postId, postData) => {
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
    listOfAllPosts: async () => {
        try {
            const posts = await Post.find().populate('user', 'username');
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
    slugBesedUrl: async (slug) => {
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
    getPostsByCategory: async (category) => {
        try {
            const posts = await Post.find({ categories: category }).populate('user', 'username');
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
    getPostsByDate: async (date) => {
        try {
            const posts = await Post.find({ createdAt: { $gte: date } }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByKeyword: async (keyword) => {
        try {
            const posts = await Post.find({ title: { $regex: keyword, $options: 'i' } }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByPopularity: async () => {
        try {
            const posts = await Post.find().sort({ views: -1 }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByLikes: async () => {
        try {
            const posts = await Post.find().sort({ likes: -1 }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByComments: async () => {
        try {
            const posts = await Post.find().sort({ comments: -1 }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByShares: async () => {
        try {
            const posts = await Post.find().sort({ shares: -1 }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByViews: async () => {
        try {
            const posts = await Post.find().sort({ views: -1 }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByAuthor: async (authorId) => {
        try {
            const posts = await Post.find({ user: authorId }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByDateRange: async (startDate, endDate) => {
        try {
            const posts = await Post.find({
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
            }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByPopularityRange: async (minLikes, maxLikes) => {
        try {
            const posts = await Post.find({
                likes: { $gte: minLikes, $lte: maxLikes }
            }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByTagsAndCategories: async (tags, categories) => {
        try {
            const posts = await Post.find({
                $or: [
                    { tags: { $in: tags } },
                    { categories: { $in: categories } }
                ]
            }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsBySearch: async (searchTerm) => {
        try {
            const posts = await Post.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { content: { $regex: searchTerm, $options: 'i' } }
                ]
            }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByMultipleFilters: async (filters) => {
        try {
            const query = {};
            if (filters.categories) {
                query.categories = { $in: filters.categories };
            }
            if (filters.tags) {
                query.tags = { $in: filters.tags };
            }
            if (filters.authorId) {
                query.user = filters.authorId;
            }
            if (filters.startDate && filters.endDate) {
                query.createdAt = { $gte: new Date(filters.startDate), $lte: new Date(filters.endDate) };
            }
            const posts = await Post.find(query).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByUserAndCategory: async (userId, category) => {
        try {
            const posts = await Post.find({ user: userId, categories: category }).populate('user', 'username');
            return posts;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getPostsByUserAndTag: async (userId, tag) => {
        try {
            const posts = await Post.find({ user: userId, tags: tag }).populate('user', 'username');
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