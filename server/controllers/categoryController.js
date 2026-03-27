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