import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import API from "../api/axios.js";

const Homepage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [womenProducts, setWomenProducts] = useState([]);
    const [menProducts, setMenProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const [womenRes, menRes] = await Promise.all([
                    API.get(`/api/products?category=women`),
                    API.get(`/api/products?category=men`)
                ]);

                setWomenProducts(womenRes.data.products);
                setMenProducts(menRes.data.products);
                setLoading(false);
            } catch (error) {
                console.log(error?.response?.data?.message || error.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-3 mt-3">

            <div className="relative">
                <img
                    src="/assets/banner.jpg"
                    className="w-full h-52 md:h-80 lg:h-105 object-cover rounded-2xl shadow-sm"
                />

                <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
                    <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-black mb-3">
                        Deals you can't ignore
                    </h1>

                    <button onClick={() => navigate("/products/women")} className="bg-[#003963] text-white mt-1 px-5 py-2 md:px-8 md:py-3 rounded-full font-semibold hover:bg-transparent hover:text-black border border-[#003963] transition">
                        Shop Now
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
                </div>
            )}

            {womenProducts.length > 0 && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            Suggested for Women
                        </h2>

                        <Link
                            to="/products/women"
                            className="text-[#003963] font-semibold hover:underline"
                        >
                            Explore All
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-stretch">
                        {womenProducts.slice(0, 12).map((product) => (
                            <Link
                                to={`/products/women/${product.slug}`}
                                key={product._id}
                                className="h-full"
                            >
                                <ProductCard product={product} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {menProducts.length > 0 && (
                <div className="my-10">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                            Suggested for Men
                        </h2>

                        <Link
                            to="/products/men"
                            className="text-[#003963] font-semibold hover:underline"
                        >
                            Explore All
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-stretch">
                        {menProducts.slice(0, 12).map((product) => (
                            <Link
                                to={`/products/men/${product.slug}`}
                                key={product._id}
                                className="h-full"
                            >
                                <ProductCard product={product} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;