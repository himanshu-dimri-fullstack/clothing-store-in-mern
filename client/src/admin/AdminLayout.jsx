import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
    ChevronDown
} from "lucide-react";
import { Menu } from 'lucide-react';
import ScrollToTop from "../components/ScrollToTop";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false)
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    const [hideMainComponent, setHideMainComponent] = useState(false)

    const handleMenuClick = () => {
        setOpenMenu((prev) => !prev)
    }

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
        const fetchUser = async () => {
            try {
                const res = await API.get("api/admin");
                const userData = res.data;
                setUser(userData);
                setLoading(false);
            }
            catch (error) {
                if (user?.role == "user") {
                    navigate("/")
                }
                else {
                    navigate("/login");
                }
            }
        }
        fetchUser();
    }, [])
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen bg-white shadow-md hidden md:block">
                <Sidebar />
            </div>
            {
                openMenu &&
                <div className="fixed top-0 left-0 h-screen bg-white shadow-md block md:hidden">
                    <Sidebar handleMenuClick={handleMenuClick} />
                </div>
            }

            {/* Main Content */}
            {
                !openMenu &&
                <div className="col-span-4 md:ml-64 bg-gray-100 min-h-screen">
                    <ScrollToTop />
                    <div className="flex justify-between items-center sticky top-0 py-3 z-99 px-6 bg-gray-100">

                        <div className="hidden md:block">
                            <h1 className="text-xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
                            <p className="text-gray-500 text-sm">Welcome back 👋</p>
                        </div>
                        {
                            openMenu ? <button onClick={handleMenuClick}>
                                <X />
                            </button>
                                :
                                <button onClick={handleMenuClick} className='block md:hidden text-2xl'>
                                    <Menu />
                                </button>
                        }
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-200 px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="w-7 h-7 md:w-10 md:h-10 bg-[#003963] text-sm md:text-xl text-white flex items-center justify-center rounded-full font-semibold">
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>

                                <div className="text-left">
                                    <p className="hidden md:block text-sm font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>

                                <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
                            </button>

                            {open && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl  p-1">
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
                    <div className="p-6">
                        <Outlet />
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminLayout;