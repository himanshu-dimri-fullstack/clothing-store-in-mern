import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-lg ${isActive ? "bg-[#003963] text-white" : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <div className="w-64 bg-white p-5">
            <h2 className="text-xl font-bold mb-6">Admin</h2>

            <nav className="space-y-2">
                <NavLink to="/admin" end className={linkClass}>
                    Home
                </NavLink>

                <NavLink to="/admin/category" className={linkClass}>
                    Category
                </NavLink>

                <NavLink to="/admin/subcategory" className={linkClass}>
                    SubCategory
                </NavLink>

                <NavLink to="/admin/product" className={linkClass}>
                    Products
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;