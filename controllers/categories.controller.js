const categories = require('../services/categories.service');
const validation = require('../validation/categories.validation');

const CategoriesController = {
    createCategory: async (req, res) => {
        try {
            const { error } = validation.createCategory.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const category = await categories.createCategory(req.body);
            return res.status(201).json(category);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const category = await categories.getCategoryById(req.params.id);
            return res.status(200).json(category);
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { error } = validation.updateCategory.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const category = await categories.updateCategory(req.params.id, req.body);
            return res.status(200).json(category);
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const response = await categories.deleteCategory(req.params.id);
            return res.status(200).json(response);
        } catch (err) {
            return res.status(404).json({ message: err.message });
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categoriesList = await categories.getAllCategories();
            return res.status(200).json(categoriesList);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};
module.exports = CategoriesController;