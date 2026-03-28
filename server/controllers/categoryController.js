import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        if (error.name == "ValidationError") {
            return res.status(400).json({ message: "Enter Category" });
        }
        if (error.code == 11000) {
            return res.status(400).json({ message: "Category already exist" });
        }
        res.status(500).json({ message: "Internal server Error" });
    }

}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
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
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid Category ID" });
        }
        res.status(500).json({ message: "Internal Server Error" });
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
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid Category ID" });
        }
        if (error.name == "ValidationError") {
            return res.status(400).json({ message: "Enter Category" });
        }
        if (error.code == 11000) {
            return res.status(400).json({ message: "Category Already Exist" });
        }
        res.status(500).json({ message: "Internal Server Error" })
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
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid Category ID" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}
