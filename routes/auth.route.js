const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user.model');

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: '/login',
}), (req, res) => {
  // Send token or redirect
  res.json({ message: 'Google login success', user: req.user });
});

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', {
  session: false,
  failureRedirect: '/login',
}), (req, res) => {
  res.json({ message: 'GitHub login success', user: req.user });
});

// LinkedIn
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin', {
  session: false,
  failureRedirect: '/login',
}), (req, res) => {
  res.json({ message: 'LinkedIn login success', user: req.user });
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router;