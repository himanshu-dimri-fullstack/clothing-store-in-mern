import { Users, ShoppingCart, Package, IndianRupee, Layers, Grid3X3, ChevronDown } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await API.post("api/logout");
            setUser(null);
            navigate("/");
        }
        catch (error) {
            console.log(error.response.data.message);
        }
    }

    const stats = [
        { title: "Total Users", value: "1,245", icon: <Users size={20} /> },
        { title: "Orders", value: "320", icon: <ShoppingCart size={20} /> },
        { title: "Revenue", value: "₹45,000", icon: <IndianRupee size={20} /> },
    ];

    const catalogStats = [
        { title: "Categories", value: "12", icon: <Layers size={20} /> },
        { title: "SubCategories", value: "35", icon: <Grid3X3 size={20} /> },
        { title: "Products", value: "120", icon: <Package size={20} /> },
    ];


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
                        <div className="w-10 h-10 bg-linear-to-r from-indigo-500 to-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                            <p className="text-xs text-gray-500">Admin</p>
                        </div>

                        <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border p-2 animate-fadeIn">

                            <button
                                onClick={() => handleLogout()}
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

                            <div className="bg-linear-to-r from-indigo-500 to-blue-600 text-white p-3 rounded-xl shadow">
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
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>

                <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 transition"
                        >
                            <span className="font-medium text-gray-700">Order #ORD00{item}</span>
                            <span className="text-gray-500 font-semibold">₹{item * 500}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;