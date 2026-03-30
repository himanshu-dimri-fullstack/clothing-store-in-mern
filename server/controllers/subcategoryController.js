import Subcategory from "../models/Subcategory.js";
import { handleResponseError } from "../utils/errorUtils.js"

export const createSubcategory = async (req, res) => {
    try {
        const subcategory = await Subcategory.create(req.body);
        res.status(201).json(subcategory);
    }
    catch (error) {
        return handleResponseError(error, res);
    }

}

export const getSubcategory = async (_, res) => {
    try {
        const subcategory = await Subcategory.find();
        res.status(200).json(subcategory);
    }
    catch (error) {
        return handleResponseError(error, res);
    }
}

export const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findById(req.params.id);

        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json(subcategory);
    }
    catch (error) {
        return handleResponseError(error, res, "Subcategory");
    }
}

export const getSubcategoryByIdAndUpdate = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json(subcategory);
    }
    catch (error) {
        return handleResponseError(error, res, "Subcategory");
    }
}

export const deleteSubcategoryById = async (req, res) => {
    try {
        const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }
        res.status(200).json({ message: "Subcategory deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return handleResponseError(error, res, "Subcategory");
    }
}
