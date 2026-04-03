import { ShoppingCart, User } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import { AuthContext } from "../../context/AuthContext"
import { ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import API from "../../api/axios"

const NavbarTop = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef();
    const { cart } = useContext(CartContext);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("/api/logout");
            setUser(null);
            setOpen(false);
        }
        catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto pt-3 px-3">
            <div className="flex pb-2 h-10 lg:h-12 justify-between items-center gap-3">
                <Link to="/">
                    <img src="/assets/logo.png" className="h-10 w-25 object-contain" />
                </Link>
                <div className="hidden lg:block">
                    <input placeholder="Search" className="p-2 w-100 xl:w-200 outline-none border border-[#53c9d7] rounded-xl text-sm text-black font-semibold
                     focus:outline-none" />
                </div>
                <div className="flex gap-6">
                    <Link to="/cart" className="flex items-center gap-1">
                        {
                            cart.length > 0 ?
                                <>
                                    <ShoppingCart size={16} strokeWidth={2} />
                                    <span className="text-sm text-black font-semibold">Cart</span>
                                    <span className="flex items-center justify-center w-5 h-5 text-xs text-white font-semibold bg-[#003963] rounded-full">
                                        {cart.length}
                                    </span>
                                </>
                                :
                                <>
                                    <ShoppingCart size={16} strokeWidth={2} />
                                    <span className="text-sm text-black font-semibold">Cart</span>
                                </>
                        }
                    </Link>
                    {
                        user ?
                            <div className="relative z-50" ref={menuRef}>
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 text-sm text-white bg-[#003963]
                border border-[#003963] rounded-full px-4 lg:px-6 py-1.5 lg:py-2 
                font-semibold hover:bg-white hover:text-black transition-all duration-200"
                                >
                                    {user?.name.split(" ")[0]}
                                    <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#003963] px-2 py-2 animate-fadeIn">

                                        <button
                                            onClick={() => navigate("/dashboard")}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 transition"
                                        >
                                            <LayoutDashboard size={16} />
                                            Dashboard
                                        </button>

                                        <button
                                            onClick={() => handleLogout()}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                            :
                            <div className="flex gap-2">
                                <button onClick={() => navigate("/login")} className="text-sm text-white bg-[#003963] border border-[#003963]
                        rounded-4xl px-4 lg:px-8 py-1 lg:py-2 font-semibold hover:bg-white hover:text-black">Login</button>
                            </div>
                    }

                </div>
            </div>
            <div className="block lg:hidden my-3">
                <input placeholder="Search" className="p-2 w-full outline-none border border-[#53c9d7] rounded-xl text-sm text-black font-semibold
                     focus:outline-none" />
            </div>
        </div>
    )
}

export default NavbarTop