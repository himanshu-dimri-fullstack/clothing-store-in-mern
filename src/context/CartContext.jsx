import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])
    console.log({ "cart": cart });

    const addToCart = (product) => {
        setCart([...cart, { ...product, qty: 1 }]);
    };

    const increaseQty = (product) => {
        setCart(prev => prev.map(item =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ))
    }

    const decreaseQty = (product) => {
        setCart(prev => prev.map(item =>
            item.id === product.id ? (item.qty > 1 ? { ...item, qty: item.qty - 1 } : item) : item
        ))
    }

    const removeItem = (product) => {
        setCart(prev => prev.filter(item =>
            item.id !== product.id
        ))
    }

    return (
        <CartContext.Provider value={{ addToCart, cart, increaseQty, decreaseQty, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider