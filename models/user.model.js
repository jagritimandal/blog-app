const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    socialLinks: {
        twitter: {
            type: String,
            default: ''
        },
        github: {
            type: String,
            default: ''
        },
        facebook:{
            type:String,
            default:''
        }
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
}, {
    timestamps: true
});

userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
module.exports = User;
