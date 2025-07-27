const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const UserService = {
  regester: async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  },
  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  },
  userProfile: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
  updateProfile: async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },
  userRolepermision: async (userId, role) => {
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
};

module.exports = UserService;