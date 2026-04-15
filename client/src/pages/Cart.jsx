import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const { cart, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const total = cart.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0
    );

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-10 rounded-xl shadow text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Please login to view your cart
                    </h2>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-[#003963] text-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#003963] border border-[#003963] transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

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
                                key={item._id}
                                className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 items-center gap-4"
                            >
                                <div className="flex items-center gap-4 md:col-span-2">
                                    <img
                                        src={`${baseUrl}${item.product?.images[0]}`}
                                        alt=""
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {item.product?.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ₹{item.product?.price}
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
                                        ₹{item.product?.price * item.qty}
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
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-6">

                        <h2 className="text-lg font-semibold mb-5 tracking-tight text-gray-800">
                            Order Summary
                        </h2>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-800">₹{total}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-medium">Free</span>
                            </div>
                        </div>

                        <div className="my-5 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                        <div className="flex justify-between items-center font-semibold text-gray-900">
                            <span>Total</span>
                            <span className="text-lg">₹{total}</span>
                        </div>

                        <button
                            onClick={() => navigate("/checkout")}
                            className="w-full mt-6 bg-[#003963] text-white py-3 rounded-xl font-medium tracking-wide hover:scale-[1.02] hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003963]/40"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;