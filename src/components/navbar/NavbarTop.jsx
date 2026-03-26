import { ShoppingCart, User } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"

const NavbarTop = () => {

    const { cart } = useContext(CartContext);

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
                    <div className="flex gap-2">
                        <button className="text-sm text-white bg-[#003963] border border-[#003963]
                        rounded-4xl px-4 lg:px-8 py-1 lg:py-2 font-semibold hover:bg-white hover:text-black">Login</button>
                    </div>
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