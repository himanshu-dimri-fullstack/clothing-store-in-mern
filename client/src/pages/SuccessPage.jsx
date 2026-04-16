import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const order = state?.data;

    if (!order) {
        return <h2 className="text-center mt-10">No Order Found</h2>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-lg text-center">

                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    Order Placed!
                </h1>

                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully.
                </p>

                <div className="text-left space-y-2 text-sm">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 w-full bg-[#003963] text-white py-3 rounded-xl"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}