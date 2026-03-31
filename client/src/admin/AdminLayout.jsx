import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const AdminLayout = () => {
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