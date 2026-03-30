import express from "express"
import {
    createProduct, getProduct, getProductById, getProductByIdAndUpdate,
    deleteProductById
} from "../controllers/productController.js";

const router = express.Router();

router.post("/products", createProduct)
router.get("/products", getProduct)
router.get("/products/:id", getProductById)
router.put("/products/:id", getProductByIdAndUpdate)
router.delete("/products/:id", deleteProductById)

export default router