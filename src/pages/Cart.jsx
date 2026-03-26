import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
    const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto grid lg:grid-cols-3 gap-6 px-3">

                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-2xl font-bold">Shopping Cart</h2>

                    {cart.length === 0 ? (
                        <div className="bg-white rounded-xl shadow p-10 text-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500">
                                Looks like you haven't added anything yet.
                            </p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 items-center gap-4"
                            >
                                <div className="flex items-center gap-4 md:col-span-2">
                                    <img
                                        src={item.thumbnail}
                                        alt=""
                                        className="w-20 h-20 object-cover rounded-lg border border-transparent"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ₹{item.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => decreaseQty(item)}
                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                    >
                                        -
                                    </button>
                                    <span className="font-medium">{item.qty}</span>
                                    <button
                                        onClick={() => increaseQty(item)}
                                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-center md:text-right">
                                    <p className="font-semibold text-gray-800">
                                        ₹{item.price * item.qty}
                                    </p>
                                    <button
                                        onClick={() => removeItem(item)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-[#003963]">Free</span>
                        </div>

                        <hr className="my-3" />

                        <div className="flex justify-between font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>

                        <button className="w-full bg-[#003963] hover:bg-white hover:text-[#003963] border border-[#003963] text-white py-2 rounded-lg transition">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;