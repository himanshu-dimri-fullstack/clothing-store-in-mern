import express from "express"
import {
    createProduct, getProduct, getProductById, getProductByIdAndUpdate,
    deleteProductById
} from "../controllers/productController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.get("/products", getProduct)
router.get("/products/:id", getProductById)
router.post("/products", auth, isAdmin, createProduct)
router.put("/products/:id", auth, isAdmin, getProductByIdAndUpdate)
router.delete("/products/:id", auth, isAdmin, deleteProductById)

export default router