import express from "express"
import { createCategory, getCategory, getCategoryById, getCategoryByIdAndUpdate, deleteCategoryById } from "../controllers/categoryController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.get("/categories", getCategory)
router.get("/categories/:id", getCategoryById)
router.post("/categories", auth, isAdmin, createCategory)
router.put("/categories/:id", auth, isAdmin, getCategoryByIdAndUpdate)
router.delete("/categories/:id", auth, isAdmin, deleteCategoryById)

export default router