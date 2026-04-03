import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AdminLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("api/admin");
                const userData = res.data;
                setUser(userData);
                setLoading(false);
            }
            catch (error) {
                if (user?.user?.role == "user") {
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
        <div>
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="ml-64 p-6 bg-gray-100 min-h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;