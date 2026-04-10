import express from "express"
import {
    createProduct, getProducts, getProductById, getProductByIdAndUpdate,
    deleteProductById
} from "../controllers/productController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/products", getProducts)
router.get("/products/:id", getProductById)
router.post("/products", auth, isAdmin, upload.array("images"), createProduct)
router.put("/products/:id", auth, isAdmin, upload.array("images"), getProductByIdAndUpdate)
router.delete("/products/:id", auth, isAdmin, deleteProductById)

export default router