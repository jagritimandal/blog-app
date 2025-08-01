const user =require('../services/user.service');
const Validation =require('../validation/user.validation');

const UserController = {
    createUser: async (req, res) => {
        try {
            const { error } = Validation.createUserValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const newUser = await user.register(req.body);
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const foundUser = await user.getUserById(userId);
            return res.status(200).json(foundUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    updateUser: async (req, res) => {   
        try {
            const userId = req.params.id;
            const { error } = Validation.updateUserValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const updatedUser = await user.updateUser(userId, req.body);
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await user.deleteUser(userId);
            return res.status(200).json(deletedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await user.getAllUsers();
            return res.status(200).json(allUsers);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { error } = Validation.loginUserValidation(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const loggedInUser = await user.login(req.body);
            return res.status(200).json(loggedInUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    logoutUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const loggedOutUser = await user.logout(userId);
            return res.status(200).json(loggedOutUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    followUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const followedUser = await user.followUser(userId, req.body.followerId);
            return res.status(200).json(followedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    unfollowUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const unfollowedUser = await user.unfollowUser(userId, req.body.followerId);
            return res.status(200).json(unfollowedUser);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserFollowers: async (req, res) => {
        try {
            const userId = req.params.id;
            const followers = await user.getUserFollowers(userId);
            return res.status(200).json(followers);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserFollowing: async (req, res) => {
        try {
            const userId = req.params.id;
            const following = await user.getUserFollowing(userId);
            return res.status(200).json(following);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const userId = req.params.id;
            const posts = await user.getUserPosts(userId);
            return res.status(200).json(posts);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserMedia: async (req, res) => {
        try {
            const userId = req.params.id;
            const media = await user.getUserMedia(userId);
            return res.status(200).json(media);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getUserCategories: async (req, res) => {
        try {
            const userId = req.params.id;
            const categories = await user.getUserCategories(userId);
            return res.status(200).json(categories);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

module.exports = UserController;