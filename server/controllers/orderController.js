import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import { handleResponseError } from "../utils/errorUtils.js";

export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;

        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const cartItems = await Cart.find({ user: userId }).populate("product");

        if (!cartItems.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const items = cartItems.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.qty,
        }));

        const totalAmount = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            user: userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await Cart.deleteMany({ user: userId });

        res.status(201).json({
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "name price")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("items.product", "name price");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};