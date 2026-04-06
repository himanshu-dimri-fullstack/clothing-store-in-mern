import { useState } from "react";

export default function CheckoutPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        card: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed", form);
    };

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

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eee] h-fit sticky top-10">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Product 1</span>
                            <span>₹999</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Product 2</span>
                            <span>₹499</span>
                        </div>
                    </div>

                    <hr className="my-6" />

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹1498</span>
                    </div>

                    <button className="w-full mt-6 border border-[#003963] text-[#003963] py-3 rounded-xl hover:bg-[#003963] hover:text-white transition focus:outline-none focus:ring-2 focus:ring-[#003963]">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}