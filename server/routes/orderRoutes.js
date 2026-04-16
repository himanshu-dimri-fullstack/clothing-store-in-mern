import express from "express"
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js"
import { auth } from "../middlewares/auth.js"
import { isAdmin } from "../middlewares/admin.js"

const router = express.Router();

router.post("/orders", auth, createOrder);
router.get("/orders", auth, isAdmin, getOrders);
router.get("/orders/:id", auth, isAdmin, getOrderById);

export default router;
