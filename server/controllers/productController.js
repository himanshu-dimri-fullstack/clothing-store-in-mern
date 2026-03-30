import Product from "../models/Product.js";
import { handleResponseError } from "../utils/errorUtils.js"

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        return handleResponseError(error, res);
    }

}

export const getProduct = async (_, res) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    }
    catch (error) {
        return handleResponseError(error, res);
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product)
    }
    catch (error) {
        return handleResponseError(error, res, "Product");
    }
}

export const getProductByIdAndUpdate = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        return handleResponseError(error, res, "Product");
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        return handleResponseError(error, res, "Product");
    }
}
