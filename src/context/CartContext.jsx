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
        const exist = cart.find(item => item.id === product.id);

        if (exist) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    return (
        <CartContext.Provider value={{ addToCart, cart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider