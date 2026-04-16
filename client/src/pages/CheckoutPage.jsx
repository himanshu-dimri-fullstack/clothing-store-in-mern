import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {

    const navigate = useNavigate();
    const { cart } = useContext(CartContext);

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        paymentMethod: "COD"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        const phoneValid = /^[0-9]{10}$/.test(form.phone);
        const pincodeValid = /^[0-9]{6}$/.test(form.pincode);

        return (
            form.fullName.trim() &&
            phoneValid &&
            form.address.trim() &&
            form.city.trim() &&
            form.state.trim() &&
            pincodeValid &&
            form.country.trim() &&
            form.paymentMethod
        );
    };

    const total = cart.reduce(
        (acc, curr) => acc + curr.product.price * curr.qty,
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) return;

        try {
            const res = await API.post("/api/orders", {
                shippingAddress: {
                    fullName: form.fullName,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode,
                    country: form.country
                },
                paymentMethod: form.paymentMethod
            });

            navigate("/success", { state: res.data });

        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-md border border-gray-100"
                >
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">
                        Checkout
                    </h2>

                    <div className="grid grid-cols-2 gap-5">

                        <input
                            name="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="col-span-2 p-3 border border-gray-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40 focus:border-[#003963]"
                        />

                        <input
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className={`col-span-2 p-3 border rounded-xl 
                            ${!form.phone || /^[0-9]{10}$/.test(form.phone)
                                    ? "border-gray-200"
                                    : "border-red-500"}
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40`}
                        />

                        <input
                            name="address"
                            placeholder="Street Address"
                            value={form.address}
                            onChange={handleChange}
                            className="col-span-2 p-3 border border-gray-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40"
                        />

                        <input
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChange}
                            className="p-3 border border-gray-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40"
                        />

                        <input
                            name="state"
                            placeholder="State"
                            value={form.state}
                            onChange={handleChange}
                            className="p-3 border border-gray-200 rounded-xl 
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40"
                        />

                        <input
                            name="pincode"
                            placeholder="Pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            className={`col-span-2 p-3 border rounded-xl 
                            ${!form.pincode || /^[0-9]{6}$/.test(form.pincode)
                                    ? "border-gray-200"
                                    : "border-red-500"}
                            focus:outline-none focus:ring-2 focus:ring-[#003963]/40`}
                        />

                    </div>

                    <h3 className="text-xl font-medium mt-10 mb-5 text-gray-800">
                        Payment Method
                    </h3>

                    <select
                        name="paymentMethod"
                        value={form.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-[#003963]/40"
                    >
                        <option value="COD">Cash on Delivery</option>
                    </select>

                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`w-full mt-10 py-4 rounded-xl text-lg font-medium transition-all duration-200
                        ${isFormValid()
                                ? "bg-[#003963] text-white hover:opacity-90 hover:scale-[1.01]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Place Order
                    </button>
                </form>

                <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-gray-100 h-fit sticky top-10">

                    <h2 className="text-xl font-semibold mb-5 text-gray-800">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-start text-sm border-b border-gray-100 pb-3"
                            >
                                <div>
                                    <p className="font-medium text-gray-700">
                                        {item?.product?.name}
                                    </p>
                                    <p className="text-gray-400 text-xs">
                                        Qty: {item?.qty}
                                    </p>
                                </div>

                                <p className="font-medium text-gray-800">
                                    ₹{item?.product?.price * item?.qty}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="my-6 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                    <div className="flex justify-between items-center text-base font-semibold text-gray-900">
                        <span>Total</span>
                        <span className="text-lg">₹{total}</span>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full mt-6 bg-gray-100 text-gray-700 py-3 rounded-xl 
                        hover:bg-gray-200 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}