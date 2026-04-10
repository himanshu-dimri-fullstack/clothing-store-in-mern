import Category from "../models/Category.js";
import { handleResponseError } from "../utils/errorUtils.js"

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        return handleResponseError(error, res);
    }

}

export const getCategory = async (_, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch (error) {
        return handleResponseError(error, res);
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        return handleResponseError(error, res, "Category");
    }
}

export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        return handleResponseError(error, res, "Category");
    }
}

export const getCategoryByIdAndUpdate = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        return handleResponseError(error, res, "Category");
    }
}

export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        console.log(error)
        return handleResponseError(error, res, "Category");
    }
}
