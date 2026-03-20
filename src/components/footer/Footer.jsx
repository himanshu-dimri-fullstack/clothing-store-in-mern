import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <div className="w-full bg-[#003963] border-b border-[#ccc] mt-6">
                <div className="container mx-auto py-10 px-3">
                    <div className="flex justify-center">
                        <div className="flex gap-20">
                            <div>
                                <h5 className="text-lg text-white font-semibold mb-3">About</h5>
                                <div className="flex flex-col text-sm text-white">
                                    <Link to="/" className="mb-1">About us</Link>
                                    <Link to="/" className="mb-1">Contact Us</Link>
                                    <Link to="/" className="mb-1">Careers</Link>
                                </div>
                            </div>
                            <div>
                                <h5 className="text-lg text-white font-semibold mb-3">Category</h5>
                                <div className="flex flex-col text-sm text-white">
                                    <Link to="/" className="mb-1">Men</Link>
                                    <Link to="/" className="mb-1">Women</Link>
                                    <Link to="/" className="mb-1">Kids</Link>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center py-3 bg-[#003963] text-sm text-white font-semibold">
                <Link to="/">clothingstore.com</Link>
            </div>
        </>

    )
}

export default Footer