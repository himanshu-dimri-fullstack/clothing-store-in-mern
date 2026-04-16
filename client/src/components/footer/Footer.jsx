import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className="w-full  bg-[#141212] border-t border-[#ccc] pt-6">
                <div className="container mx-auto py-10 px-3">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white">
                        <div>
                            <h5 className="text-lg font-semibold mb-3">About</h5>
                            <div className="flex flex-col text-sm">
                                <Link to="/" className="mb-1">About Us</Link>
                                <Link to="/" className="mb-1">Contact Us</Link>
                                <Link to="/" className="mb-1">Careers</Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-3">Category</h5>
                            <div className="flex flex-col text-sm">
                                <Link to="/products/men" className="mb-1">Men</Link>
                                <Link to="/products/women" className="mb-1">Women</Link>
                                <Link to="/products/kids" className="mb-1">Kids</Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-3">Support</h5>
                            <div className="flex flex-col text-sm">
                                <Link to="/" className="mb-1">FAQ</Link>
                                <Link to="/" className="mb-1">Shipping</Link>
                                <Link to="/" className="mb-1">Returns</Link>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold mb-3">Follow Us</h5>
                            <div className="flex flex-col text-sm">
                                <Link to="/" className="mb-1">Facebook</Link>
                                <Link to="/" className="mb-1">Instagram</Link>
                                <Link to="/" className="mb-1">Twitter</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer