import Product from "../models/Product.js";
import { handleResponseError } from "../utils/errorUtils.js";

export const createProduct = async (req, res) => {
    try {
        const imagePaths = req.files?.map(file => file.path) || [];

        const product = await Product.create({
            ...req.body,
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
            images: imagePaths
        });

        res.status(201).json(product);
    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const getProduct = async (_, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("subcategory")

        res.status(200).json(products);
    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category")
            .populate("subcategory");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        return handleResponseError(error, res, "Product");
    }
};

export const getProductByIdAndUpdate = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.body.sizes) {
            updateData.sizes = JSON.parse(req.body.sizes);
        }

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            updateData.images = imagePaths;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        return handleResponseError(error, res, "Product");
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return handleResponseError(error, res, "Product");
    }
};