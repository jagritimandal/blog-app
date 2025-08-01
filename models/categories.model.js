const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug:{
    type:String,
    required: true,
    unique: true,
    trim: true
  },
  description:{
    type: String,
    default: null,
    trim: true
  }
},
{
  timestamps: true
});

const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;
