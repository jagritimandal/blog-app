const categories = require('../models/categories.model');

const CategoriesService = {
    createCategory: async (categoryData) => {
        try {
            const category = new categories(categoryData);
            await category.save();
            return category;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getCategoryById: async (categoryId) => {
        try {
            const category = await categories.findById(categoryId);
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    updateCategory: async (categoryId, categoryData) => {
        try {
            const category = await categories.findByIdAndUpdate(categoryId, categoryData, { new: true });
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    deleteCategory: async (categoryId) => {
        try {
            const category = await categories.findById(categoryId);
            if (!category) {
                throw new Error('Category not found');
            }
            await categories.deleteOne({ _id: categoryId });
            return { message: 'Category deleted successfully' };
        } catch (err) {
            throw new Error(err.message);
        }
    },
    getAllCategories: async () => {
        try {
            const allCategories = await categories.find();
            return allCategories;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};
module.exports = CategoriesService;