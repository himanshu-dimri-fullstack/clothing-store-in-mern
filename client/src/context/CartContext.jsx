import { useContext, createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import API from "../api/axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log({ "user": user });

    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await API.get("/api/cart", user);
            const data = res.data
            console.log(data);
            setCart(data);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (user?._id) {
            fetchCart();
        }
    }, [user?._id]);

    const addToCart = async (product) => {
        try {
            await API.post("/api/cart", {
                userId: user._id,
                productId: product._id,
                qty: 1
            });
            fetchCart();
        } catch (error) {
            console.log(error?.response?.data?.message);
            throw error;
        }
    };

    const increaseQty = async (item) => {
        try {
            await API.put(`/api/cart/${item._id}`, { action: "inc" });
            fetchCart();
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    const decreaseQty = async (item) => {
        try {
            await API.put(`/api/cart/${item._id}`, { action: "dec" });
            fetchCart();
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    const removeItem = async (item) => {
        try {
            await API.delete(`/api/cart/${item._id}`);
            fetchCart();
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;