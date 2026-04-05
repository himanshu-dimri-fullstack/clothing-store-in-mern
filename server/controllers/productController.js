import Product from "../models/Product.js";
import { handleResponseError } from "../utils/errorUtils.js";
import fs from "fs";
import path from "path";


export const createProduct = async (req, res) => {
    try {
        const BASE_URL = `${req.protocol}://${req.get("host")}`;

        const imageUrls = req.files?.map(file => {
            return `${BASE_URL}/${file.path}`;
        }) || [];

        const product = await Product.create({
            ...req.body,
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
            images: imageUrls
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

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const BASE_URL = `${req.protocol}://${req.get("host")}`;

        let deletedImages = [];
        if (req.body.deletedImages) {
            deletedImages = JSON.parse(req.body.deletedImages);
        }

        deletedImages.forEach((imgUrl) => {
            try {
                const filePath = path.join(process.cwd(), imgUrl.replace(BASE_URL + "/", ""));
                fs.unlinkSync(filePath);
            } catch (err) {
                console.log("Delete error:", err.message);
            }
        });

        let updatedImages = product.images.filter(
            (img) => !deletedImages.includes(img)
        );

        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => {
                return `${BASE_URL}/${file.path}`;
            });

            updatedImages = [...updatedImages, ...newImageUrls];
        }

        updateData.images = updatedImages;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedProduct);

    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const BASE_URL = `${req.protocol}://${req.get("host")}`;

        product.images.forEach((imgUrl) => {
            try {
                const relativePath = imgUrl.replace(BASE_URL + "/", "");
                const filePath = path.join(process.cwd(), relativePath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (err) {
                console.log("Delete error:", err.message);
            }
        });

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        return handleResponseError(error, res, "Product");
    }
};