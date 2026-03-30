import express from "express"
import { createCategory, getCategory, getCategoryById, getCategoryByIdAndUpdate, deleteCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/categories", createCategory)
router.get("/categories", getCategory)
router.get("/categories/:id", getCategoryById)
router.put("/categories/:id", getCategoryByIdAndUpdate)
router.delete("/categories/:id", deleteCategoryById)

export default router