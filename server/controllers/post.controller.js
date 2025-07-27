const post = require('../models/post.model');
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
    getPostById: async (req, res) => {
        try {
            const postId = req.params.id;
            const foundPost = await post.getPostById(postId);
            return res.status(200).json(foundPost);
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
    getAllPosts: async (req, res) => {  
        try {
            const allPosts = await post.getAllPosts();
            return res.status(200).json(allPosts);
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
    getPostsByCategory: async (req, res) => {
        try {
            const category = req.params.category;
            const postsByCategory = await post.getPostsByCategory(category);
            return res.status(200).json(postsByCategory);
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
    getPostsByDate: async (req, res) => {
        try {
            const date = req.params.date;
            const postsByDate = await post.getPostsByDate(date);
            return res.status(200).json(postsByDate);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostsByKeyword: async (req, res) => {
        try {
            const keyword = req.params.keyword;
            const postsByKeyword = await post.getPostsByKeyword(keyword);
            return res.status(200).json(postsByKeyword);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostLikes: async (req, res) => {
        try {
            const postId = req.params.id;
            const likes = await post.getPostLikes(postId);
            return res.status(200).json(likes);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostComments: async (req, res) => {
        try {
            const postId = req.params.id;
            const comments = await post.getPostComments(postId);
            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostShares: async (req, res) => {    
        try {
            const postId = req.params.id;
            const shares = await post.getPostShares(postId);
            return res.status(200).json(shares);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostMedia: async (req, res) => { 
        try {
            const postId = req.params.id;
            const media = await post.getPostMedia(postId);
            return res.status(200).json(media);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostCategories: async (req, res) => {
        try {
            const postId = req.params.id;
            const categories = await post.getPostCategories(postId);
            return res.status(200).json(categories);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostTags: async (req, res) => {
        try {
            const postId = req.params.id;
            const tags = await post.getPostTags(postId);
            return res.status(200).json(tags);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostViews: async (req, res) => {
        try {
            const postId = req.params.id;
            const views = await post.getPostViews(postId);
            return res.status(200).json(views);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostReactions: async (req, res) => {
        try {
            const postId = req.params.id;
            const reactions = await post.getPostReactions(postId);
            return res.status(200).json(reactions);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostStatistics: async (req, res) => {
        try {
            const postId = req.params.id;
            const statistics = await post.getPostStatistics(postId);
            return res.status(200).json(statistics);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAuthor: async (req, res) => {
        try {
            const postId = req.params.id;
            const author = await post.getPostAuthor(postId);
            return res.status(200).json(author);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostRelated: async (req, res) => {
        try {
            const postId = req.params.id;
            const relatedPosts = await post.getPostRelated(postId);
            return res.status(200).json(relatedPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostFeatured: async (req, res) => {
        try {
            const featuredPosts = await post.getPostFeatured();
            return res.status(200).json(featuredPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostDrafts: async (req, res) => {
        try {
            const drafts = await post.getPostDrafts(req.user.id);
            return res.status(200).json(drafts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostScheduled: async (req, res) => { 
        try {
            const scheduledPosts = await post.getPostScheduled(req.user.id);
            return res.status(200).json(scheduledPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostArchived: async (req, res) => {
        try {
            const archivedPosts = await post.getPostArchived(req.user.id);
            return res.status(200).json(archivedPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },  
    getPostPinned: async (req, res) => {
        try {
            const pinnedPosts = await post.getPostPinned(req.user.id);
            return res.status(200).json(pinnedPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostSaved: async (req, res) => {
        try {
            const savedPosts = await post.getPostSaved(req.user.id);
            return res.status(200).json(savedPosts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }, 
    getPostNotifications: async (req, res) => {
        try {
            const postId = req.params.id;
            const notifications = await post.getPostNotifications(postId);
            return res.status(200).json(notifications);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostInsights: async (req, res) => {
        try {
            const postId = req.params.id;
            const insights = await post.getPostInsights(postId);
            return res.status(200).json(insights);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostEngagement: async (req, res) => {
        try {
            const postId = req.params.id;
            const engagement = await post.getPostEngagement(postId);
            return res.status(200).json(engagement);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostPerformance: async (req, res) => {
        try {
            const postId = req.params.id;
            const performance = await post.getPostPerformance(postId);
            return res.status(200).json(performance);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostReach: async (req, res) => {
        try {
            const postId = req.params.id;
            const reach = await post.getPostReach(postId);
            return res.status(200).json(reach);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostImpressions: async (req, res) => {
        try {
            const postId = req.params.id;
            const impressions = await post.getPostImpressions(postId);
            return res.status(200).json(impressions);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostClicks: async (req, res) => {
        try {
            const postId = req.params.id;
            const clicks = await post.getPostClicks(postId);
            return res.status(200).json(clicks);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostSharesCount: async (req, res) => {
        try {
            const postId = req.params.id;
            const sharesCount = await post.getPostSharesCount(postId);
            return res.status(200).json(sharesCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostCommentsCount: async (req, res) => {
        try {
            const postId = req.params.id;
            const commentsCount = await post.getPostCommentsCount(postId);
            return res.status(200).json(commentsCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostLikesCount: async (req, res) => {
        try {
            const postId = req.params.id;
            const likesCount = await post.getPostLikesCount(postId);
            return res.status(200).json(likesCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostViewsCount: async (req, res) => {
        try {
            const postId = req.params.id;
            const viewsCount = await post.getPostViewsCount(postId);
            return res.status(200).json(viewsCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostReactionsCount: async (req, res) => {
        try {
            const postId = req.params.id;
            const reactionsCount = await post.getPostReactionsCount(postId);
            return res.status(200).json(reactionsCount);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostEngagementRate: async (req, res) => {
        try {
            const postId = req.params.id;
            const engagementRate = await post.getPostEngagementRate(postId);
            return res.status(200).json(engagementRate);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostConversionRate: async (req, res) => {
        try {
            const postId = req.params.id;
            const conversionRate = await post.getPostConversionRate(postId);
            return res.status(200).json(conversionRate);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostBounceRate: async (req, res) => {
        try {
            const postId = req.params.id;
            const bounceRate = await post.getPostBounceRate(postId);
            return res.status(200).json(bounceRate);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostSessionDuration: async (req, res) => {
        try {
            const postId = req.params.id;
            const sessionDuration = await post.getPostSessionDuration(postId);
            return res.status(200).json(sessionDuration);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostTrafficSources: async (req, res) => {
        try {
            const postId = req.params.id;
            const trafficSources = await post.getPostTrafficSources(postId);
            return res.status(200).json(trafficSources);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceDemographics: async (req, res) => {
        try {
            const postId = req.params.id;
            const demographics = await post.getPostAudienceDemographics(postId);
            return res.status(200).json(demographics);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceInterests: async (req, res) => {
        try {
            const postId = req.params.id;
            const interests = await post.getPostAudienceInterests(postId);
            return res.status(200).json(interests);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceBehavior: async (req, res) => {
        try {
            const postId = req.params.id;
            const behavior = await post.getPostAudienceBehavior(postId);
            return res.status(200).json(behavior);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceLocation: async (req, res) => {
        try {
            const postId = req.params.id;
            const location = await post.getPostAudienceLocation(postId);
            return res.status(200).json(location);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceDevices: async (req, res) => {
        try {
            const postId = req.params.id;
            const devices = await post.getPostAudienceDevices(postId);
            return res.status(200).json(devices);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceOperatingSystems: async (req, res) => {
        try {
            const postId = req.params.id;
            const operatingSystems = await post.getPostAudienceOperatingSystems(postId);
            return res.status(200).json(operatingSystems);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceBrowsers: async (req, res) => {
        try {
            const postId = req.params.id;
            const browsers = await post.getPostAudienceBrowsers(postId);
            return res.status(200).json(browsers);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceLanguages: async (req, res) => {
        try {
            const postId = req.params.id;
            const languages = await post.getPostAudienceLanguages(postId);
            return res.status(200).json(languages);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getPostAudienceAgeGroups: async (req, res) => {
        try {
            const postId = req.params.id;
            const ageGroups = await post.getPostAudienceAgeGroups(postId);
            return res.status(200).json(ageGroups);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = PostController;