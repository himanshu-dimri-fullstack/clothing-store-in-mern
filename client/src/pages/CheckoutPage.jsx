import { useContext } from "react";
import { useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        card: "",
    });
    const { cart } = useContext(CartContext);
    console.log(cart);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed", form);
    };

    const total = cart.reduce((acc, curr) =>
        acc + curr.product.price * curr.qty,
        0)

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-2 bg-white p-10 rounded-2xl shadow-sm border border-[#eee]"
                >
                    <h2 className="text-3xl font-semibold mb-8">Checkout</h2>

                    <div className="grid grid-cols-2 gap-5">
                        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
                            className="col-span-2 p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />

                        <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
                            className="col-span-2 p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />

                        <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange}
                            className="col-span-2 p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />

                        <input name="city" placeholder="City" value={form.city} onChange={handleChange}
                            className="p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />

                        <input name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange}
                            className="p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />
                    </div>

                    <h3 className="text-xl font-medium mt-10 mb-5">Payment Details</h3>

                    <div className="grid grid-cols-2 gap-5">
                        <input name="card" placeholder="Card Number" value={form.card} onChange={handleChange}
                            className="col-span-2 p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />

                        <input placeholder="Expiry Date" className="p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />
                        <input placeholder="CVV" className="p-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]" />
                    </div>

                    <button type="submit"
                        className="w-full mt-10 bg-[#003963] text-white py-4 rounded-xl text-lg font-medium hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#003963]">
                        Place Order
                    </button>
                </form>

                <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-10">

                    <h2 className="text-xl font-semibold mb-5 tracking-tight text-gray-800">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {
                            cart.map((item) => {
                                return (
                                    <div key={item._id} className="flex justify-between items-start text-sm border-b border-gray-100 pb-3 last:border-none">

                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-700">
                                                {item?.product?.name}
                                            </span>
                                            <span className="text-gray-400 text-xs">
                                                Qty: {item?.qty}
                                            </span>
                                        </div>

                                        <span className="font-medium text-gray-800">
                                            ₹{(item?.product?.price) * (item?.qty)}
                                        </span>

                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="my-6 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                    <div className="flex justify-between items-center text-base font-semibold text-gray-900">
                        <span>Total</span>
                        <span className="text-lg">₹{total}</span>
                    </div>

                    <button className="w-full mt-6 bg-[#003963] text-white py-3 rounded-xl font-medium tracking-wide hover:scale-[1.02] hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#003963]/40">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}