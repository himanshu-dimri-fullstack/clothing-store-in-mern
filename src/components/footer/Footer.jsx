import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className="w-full  bg-[#024a7e] border-t border-[#ccc] mt-6">
                <div className="container mx-auto py-10 px-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white">
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
                                <Link to="/" className="mb-1">Men</Link>
                                <Link to="/" className="mb-1">Women</Link>
                                <Link to="/" className="mb-1">Kids</Link>
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

                <div className="flex justify-center items-center py-3 bg-[#003963] text-sm text-white font-semibold border-t border-[#ccc]">
                    <Link to="/">clothingstore.com</Link>
                </div>
            </div>
        </>

    )
}

export default Footer