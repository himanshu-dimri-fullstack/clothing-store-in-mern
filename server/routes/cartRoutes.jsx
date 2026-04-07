import express from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/cart", auth, addToCart);
router.get("/cart", auth, getCart);
router.put("/cart/:id", auth, updateCartItem);
router.delete("/cart:id", auth, deleteCartItem);

export default router;