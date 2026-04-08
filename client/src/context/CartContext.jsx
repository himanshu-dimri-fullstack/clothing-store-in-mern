import { useContext, createContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await API.get("/api/cart");
            setCart(res.data);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        if (user) fetchCart();
    }, [user]);

    const addToCart = async (product) => {
        if (!user) return navigate("/login");
        console.log(product);

        try {
            await API.post("/api/cart", {
                userId: user.id,
                productId: product.id,
                qty: 1
            });
            fetchCart();
        } catch (error) {
            console.log(error?.response?.data?.message);
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