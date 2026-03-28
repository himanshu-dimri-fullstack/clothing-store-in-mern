import express from "express"
import { createCategory, getCategory, getCategoryById, getCategoryByIdAndUpdate, deleteCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/category", createCategory)
router.get("/category", getCategory)
router.get("/category/:id", getCategoryById)
router.put("/category/:id", getCategoryByIdAndUpdate)
router.delete("/category/:id", deleteCategoryById)

export default router