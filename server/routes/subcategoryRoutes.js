import express from "express"
import {
    createSubcategory, getSubcategory, getSubcategoryById, getSubcategoryBySlug,
    getSubcategoryByIdAndUpdate, deleteSubcategoryById
} from "../controllers/subcategoryController.js";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.get("/subcategories", getSubcategory)
router.get("/subcategories/:slug", getSubcategoryBySlug);
router.post("/subcategories", auth, isAdmin, createSubcategory)
router.put("/subcategories/:id", auth, isAdmin, getSubcategoryByIdAndUpdate)
router.delete("/subcategories/:id", auth, isAdmin, deleteSubcategoryById)

export default router