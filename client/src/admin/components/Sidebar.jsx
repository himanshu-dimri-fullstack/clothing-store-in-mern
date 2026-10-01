import { NavLink } from "react-router-dom";
import {
    X,
    House,
    Layers,
    ListTree,
    Package,
    ShoppingCart
} from "lucide-react";

const Sidebar = ({ handleMenuClick }) => {
    const linkClass = ({ isActive }) =>
        `block px-4 py-2 text-sm rounded-lg ${isActive ? "bg-[#003963] text-white" : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <>
            <div className="hidden md:block w-64 bg-white p-5">
                <h2 className="text-xl font-bold mb-6">Admin</h2>

                <nav className="space-y-2">
                    <NavLink to="/admin" end className={linkClass}>
                        <div className="flex items-center gap-3">
                            <House size={18} />
                            Home
                        </div>
                    </NavLink>

                    <NavLink to="/admin/category" className={linkClass}>
                        <div className="flex items-center gap-3">
                            <Layers size={18} />
                            Category
                        </div>
                    </NavLink>

                    <NavLink to="/admin/subcategory" className={linkClass}>
                        <div className="flex items-center gap-3">
                            <ListTree size={18} />
                            SubCategory
                        </div>
                    </NavLink>

                    <NavLink to="/admin/product" className={linkClass}>
                        <div className="flex items-center gap-3">
                            <Package size={18} />
                            Products
                        </div>
                    </NavLink>

                    <NavLink to="/admin/orders" className={linkClass}>
                        <div className="flex items-center gap-3">
                            <ShoppingCart size={18} />
                            Orders
                        </div>
                    </NavLink>
                </nav>
            </div>

            <div className="flex md:hidden w-screen h-screen bg-white p-2 overflow-hidden flex-col">
                <div className="flex justify-between w-full flex-1 z-9999 overflow-hidden pt-3">
                    <nav className="space-y-2">
                        <NavLink onClick={handleMenuClick} to="/admin" end className={linkClass}>
                            <div className="flex items-center gap-3">
                                <House size={18} />
                                Home
                            </div>
                        </NavLink>

                        <NavLink onClick={handleMenuClick} to="/admin/category" className={linkClass}>
                            <div className="flex items-center gap-3">
                                <Layers size={18} />
                                Category
                            </div>
                        </NavLink>

                        <NavLink onClick={handleMenuClick} to="/admin/subcategory" className={linkClass}>
                            <div className="flex items-center gap-3">
                                <ListTree size={18} />
                                SubCategory
                            </div>
                        </NavLink>

                        <NavLink onClick={handleMenuClick} to="/admin/product" className={linkClass}>
                            <div className="flex items-center gap-3">
                                <Package size={18} />
                                Products
                            </div>
                        </NavLink>

                        <NavLink onClick={handleMenuClick} to="/admin/orders" className={linkClass}>
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={18} />
                                Orders
                            </div>
                        </NavLink>
                    </nav>

                    <div className="flex justify-end">
                        <button className="h-10 w-10 text-2xl" onClick={handleMenuClick}>
                            <X />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;