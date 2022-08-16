import Category from "../models/CategoryModel.js";

export const getCategory = async(req, res) => {
    try {
        const response = await Category.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCategoryById = async(req, res) => {
    try {
        const response = await Category.findOne({
            where: {
                id_category: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCategory = async(req, res) => {
    try {
        await Category.create(req.body);
        res.status(201).json({
            message: 'Category Created'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCategory = async(req, res) => {
    try {
        await Category.update(req.body, {
            where: {
                id_category: req.params.id
            }
        });
        res.status(200).json({
            message: 'Category Updated'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCategory = async(req, res) => {
    try {
        await Category.destroy({
            where: {
                id_category: req.params.id
            }
        });
        res.status(200).json({
            message: 'Category Deleted'
        });
    } catch (error) {
        console.log(error.message);
    }
}