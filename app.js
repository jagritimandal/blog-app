const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const conectDB = require('./config/db');
const passport = require('passport');
require('./config/passport'); // load strategies

app.use(passport.initialize());
const cors = require('cors');
// Load environment variables
dotenv.config();

// Connect to MongoDB
conectDB(); // <--- Make sure this connects properly

// Initialize Express
const app = express();

// Body parser middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport config
require('./config/passport');
app.use(passport.initialize());

//CORS middleware
const cors = require('cors');
app.use(cors());

//Routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}...`);
});

module.exports = app;