import express from "express"
import {
    createSubcategory, getSubcategory, getSubcategoryById,
    getSubcategoryByIdAndUpdate, deleteSubcategoryById
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.post("/subcategories", createSubcategory)
router.get("/subcategories", getSubcategory)
router.get("/subcategories/:id", getSubcategoryById)
router.put("/subcategories/:id", getSubcategoryByIdAndUpdate)
router.delete("/subcategories/:id", deleteSubcategoryById)

export default router