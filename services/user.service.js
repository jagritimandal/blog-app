const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const UserService = {
  register: async (userData) => {
      const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  },

  login: async (email, password) => {
      const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    return user;
  },

  loginWithProvider: async (provider, profile) => {
    const { email, id, name, avatar } = profile;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: name || email.split('@')[0],
        password: id, // optional: you may store hashed ID or null
        provider,
        avatar,
      });
      await user.save();
    }

    return user;
  },

  logout: async (userId) => {
    // depends on how you manage sessions or tokens
    return { message: 'Logged out', userId };
  },

  getUserById: async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  updateUser: async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  },

  deleteUser: async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return user;
  },

  getAllUsers: async () => {

    return await User.find();
  },

  followUser: async (userId, followerId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    if (!user.followers.includes(followerId)) {
      user.followers.push(followerId);
      await user.save();
    }

    return user;
  },

  unfollowUser: async (userId, followerId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.followers = user.followers.filter(id => id.toString() !== followerId);
    await user.save();

    return user;
  },

  // Stubs - implement based on your models
  getUserFollowers: async (userId) => {
    const user = await User.findById(userId).populate('followers');
    return user.followers;
  },

  getUserFollowing: async (userId) => {
    const user = await User.findById(userId).populate('following');
    return user.following;
  },

  getUserPosts: async (userId) => {
    const Post = require('../models/post.model');
    return await Post.find({ authorId: userId });
  },

  getUserMedia: async (userId) => {
    const Media = require('../models/media.model');
    return await Media.find({ uploaderId: userId });
  },

  getUserCategories: async (userId) => {
    // If you have a relationship, adjust this logic
    const Post = require('../models/post.model');
    const posts = await Post.find({ authorId: userId }).populate('categories');
    const categories = posts.flatMap(p => p.categories);
    return [...new Set(categories.map(cat => cat.name))];
  }
};

module.exports = UserService;
