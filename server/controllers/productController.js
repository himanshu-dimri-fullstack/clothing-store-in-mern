import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import { handleResponseError } from "../utils/errorUtils.js";
import fs from "fs";
import path from "path";


export const createProduct = async (req, res) => {
    try {

        const imageUrls = req.files?.map(file => {
            console.log(file);
            return `/uploads/${file.filename}`;
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
export const getProducts = async (req, res) => {
    try {
        const { category, subcategory } = req.query;
        const page = req.query.page || 1;
        const limit = req.query.limit || 12;
        const skip = (page - 1) * limit;

        let query = {};

        if (category) {
            const cat = await Category.findOne({ slug: category });
            if (cat) query.category = cat._id;
        }

        if (subcategory) {
            const subCat = await Subcategory.findOne({ slug: subcategory });
            if (subCat) query.subcategory = subCat._id;
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .populate("category")
            .populate("subcategory")
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            products,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });

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

export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
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
            try {
                updateData.sizes = JSON.parse(req.body.sizes);
            } catch {
                return res.status(400).json({ message: "Invalid sizes format" });
            }
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let deletedImages = [];
        if (req.body.deletedImages) {
            try {
                deletedImages = JSON.parse(req.body.deletedImages);
            } catch {
                return res.status(400).json({ message: "Invalid deletedImages format" });
            }
        }

        deletedImages = [...new Set(deletedImages)];

        deletedImages.forEach((imgPath) => {
            try {
                const cleanPath = imgPath.replace(/^\/+/, "");

                const filePath = path.join(process.cwd(), cleanPath);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (err) {
                console.log("Delete error:", err.message);
            }
        });

        let updatedImages = product.images.filter(
            (img) => !deletedImages.includes(img)
        );

        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(
                (file) => `/uploads/${file.filename}`
            );

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

        product.images.forEach((imgPath) => {
            try {
                const cleanPath = imgPath.replace(/^\/+/, "");

                const filePath = path.join(process.cwd(), cleanPath);

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
        return handleResponseError(error, res);
    }
};