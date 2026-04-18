import React, { useEffect, useState } from "react";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
    switch (status) {
        case "delivered":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-600";
        case "cancelled":
            return "bg-red-100 text-red-600";
        default:
            return "";
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const Orders = () => {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [pending, setPending] = useState(null);
    const [delivered, setDelivered] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersRes = await API.get("/api/orders");
                const data = ordersRes.data;
                setOrders(data.data);
                const pendingData = data.data.filter((item) => item.orderStatus == "pending");
                const deliveredData = data.data.filter((item) => item.orderStatus == "delivered");
                setPending(pendingData.length);
                setDelivered(deliveredData.length);
                setLoading(false);

            }
            catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
        fetchOrders();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            <h1 className="text-2xl font-semibold mb-6">Orders</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <Package className="text-blue-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                        <h2 className="text-xl font-bold">{orders.length}</h2>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <Truck className="text-yellow-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Pending</p>
                        <h2 className="text-xl font-bold">{pending}</h2>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                    <CheckCircle className="text-green-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Delivered</p>
                        <h2 className="text-xl font-bold">{delivered}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="p-4 font-medium"><Link to="">{order._id}</Link></td>
                                <td className="p-4">{order.user.name}</td>
                                <td className="p-4">{formatDate(order.createdAt)}</td>
                                <td className="p-4">₹{order.totalAmount}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                            order.orderStatus
                                        )}`}
                                    >
                                        {order.orderStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;