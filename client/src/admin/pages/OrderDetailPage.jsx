import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";

const OrderDetailPage = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await API.get(`/api/orders/${id}`);
                setOrder(res.data.data);
                console.log(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading || !order) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    const formattedDate = new Date(order.createdAt).toLocaleDateString();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Order Details</h1>
                    <p className="text-gray-500">Order ID: {order._id}</p>
                    <p className="text-gray-400 text-sm">Date: {formattedDate}</p>
                </div>

                <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold capitalize ${order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                >
                    {order.orderStatus}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="font-semibold text-lg mb-3">Customer Info</h2>
                    <p>{order.user?.name}</p>
                    <p className="text-gray-500">{order.user?.email}</p>
                    <p className="text-gray-500">{order.shippingAddress?.phone}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="font-semibold text-lg mb-3">Shipping Address</h2>
                    <p className="text-gray-600">
                        {order.shippingAddress?.fullName}
                    </p>
                    <p className="text-gray-600">
                        {order.shippingAddress?.address}, {order.shippingAddress?.city}
                    </p>
                    <p className="text-gray-600">
                        {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="font-semibold text-lg mb-3">Payment</h2>
                    <p className="text-gray-600">
                        Method: {order.paymentMethod}
                    </p>
                    <p className="text-gray-600 capitalize">
                        Status: {order.paymentStatus}
                    </p>
                    <p className="text-gray-800 font-semibold mt-2">
                        Total: ₹{order.totalAmount}
                    </p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
                <h2 className="font-semibold text-lg mb-4">Order Items</h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-gray-500 text-sm">
                                <th className="text-left px-4">Product</th>
                                <th className="text-left px-4">Price</th>
                                <th className="text-left px-4">Qty</th>
                                <th className="text-left px-4">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {order.items.map((item) => (
                                <tr
                                    key={item._id}
                                    className="bg-gray-50 hover:bg-gray-100 transition rounded-xl shadow-sm"
                                >

                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <div>
                                            <p className="font-medium text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500">Product ID</p>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-gray-700 font-medium">
                                        ₹{item.price}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                            {item.quantity}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 font-semibold text-gray-900">
                                        ₹{item.quantity * item.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <button className="bg-[#003963] text-white px-5 py-2 rounded-xl hover:bg-blue-700">
                    Mark as Shipped
                </button>

                <button className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600">
                    Cancel Order
                </button>
            </div>
        </div>
    );
};

export default OrderDetailPage;