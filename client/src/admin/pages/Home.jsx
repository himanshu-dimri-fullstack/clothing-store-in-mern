import {
    Users,
    ShoppingCart,
    Package,
    IndianRupee,
    Layers,
    Grid3X3,
    ChevronDown
} from "lucide-react";

import { useContext, useEffect, useState } from "react";
import API from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    const [stats, setStats] = useState([]);
    const [catalogStats, setCatalogStats] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        try {
            await API.post("api/logout");
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    usersRes,
                    ordersRes,
                    // revenueRes,
                    categoryRes,
                    subCategoryRes,
                    productRes
                ] = await Promise.all([
                    API.get("/api/users"),
                    API.get("/api/orders"),
                    // API.get("/api/orders/revenue"),
                    API.get("/api/categories"),
                    API.get("/api/subcategories"),
                    API.get("/api/products"),
                ]);
                console.log({ "order": ordersRes.data })

                setStats([
                    {
                        title: "Total Users",
                        value: usersRes.data.length,
                        icon: <Users size={20} />
                    },
                    {
                        title: "Total Orders",
                        value: ordersRes.data.data.length,
                        icon: <ShoppingCart size={20} />
                    },
                    {
                        title: "Total Revenue",
                        // value: `₹${revenueRes.data.total}`,
                        value: "₹45000",
                        icon: < IndianRupee size={20} />
                    },
                ]);

                setCatalogStats([
                    {
                        title: "Categories",
                        value: categoryRes.data.length,
                        icon: <Layers size={20} />
                    },
                    {
                        title: "SubCategories",
                        value: subCategoryRes.data.length,
                        icon: <Grid3X3 size={20} />
                    },
                    {
                        title: "Products",
                        value: productRes.data.products.length,
                        icon: <Package size={20} />
                    },
                ]);

                setRecentOrders(ordersRes.data.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 bg-gray-50 min-h-screen p-6">

            <div className="flex justify-between items-center">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-500 text-sm">Welcome back 👋</p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-200 px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="w-10 h-10 bg-[#003963] text-white flex items-center justify-center rounded-full font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>

                        <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border p-2">
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 rounded-xl hover:bg-red-50 text-red-500 font-medium transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm">{item.title}</p>
                                <h2 className="text-2xl font-bold mt-1 text-gray-800">{item.value}</h2>
                            </div>

                            <div className="bg-[#003963] text-white p-3 rounded-xl">
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Catalog Overview</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catalogStats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{item.title}</p>
                                    <h2 className="text-2xl font-bold mt-1 text-gray-800">{item.value}</h2>
                                </div>

                                <div className="bg-gray-100 p-3 rounded-xl">
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending Orders</h2>
                <div className="space-y-3">
                    {recentOrders.length > 0 ? (
                        recentOrders.map((order, index) => (
                            <div
                                key={order._id || index}
                                className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition"
                            >
                                <span className="font-medium text-gray-700">
                                    Order #{order._id}
                                </span>
                                <span className="text-gray-500 font-semibold">
                                    ₹{order.totalAmount}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No recent orders</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;