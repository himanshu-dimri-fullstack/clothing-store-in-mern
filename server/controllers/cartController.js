import Product from "../models/Product.js"
import Cart from "../models/Cart.js"
import { handleResponseError } from "../utils/errorUtils.js"

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, qty } = req.body;

        const newItem = await Cart.create({
            user: userId,
            product: productId,
            qty: qty || 1,
            priceWhenAdded: 999
        });

        res.status(201).json({
            message: "Added to cart",
            data: newItem
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.find({ user: userId })
            .populate("product", "name price images")
            .populate("user", "name email");

        res.status(200).json(cart);

    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { action } = req.body;

        const item = await Cart.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if (action === "inc") {
            item.qty += 1;
        }
        else if (action === "dec" && item.qty > 1) {
            item.qty -= 1;
        }

        await item.save();

        res.status(200).json({
            message: "Cart updated",
            data: item
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const item = await Cart.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            message: "Item removed from cart"
        });

    } catch (error) {
        return handleResponseError(error, res);
    }
};