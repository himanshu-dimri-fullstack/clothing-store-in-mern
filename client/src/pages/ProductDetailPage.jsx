import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import API from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.jsx";

const ProductDetailPage = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const { catSlug, slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [isAdded, setIsAdded] = useState(null);
    const [btnLoading, setbtnLoading] = useState(true);

    const { addToCart, cart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRes = await API.get(`/api/products/${slug}`);
                const data = productRes.data;
                setCategory(data.category.name || "Category");
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [catSlug, slug]);

    useEffect(() => {
        if (!product) return;

        if (user) {
            const exist = cart.find(item => item.product._id === product._id);
            setIsAdded(!!exist);
        } else {
            setIsAdded(false);
        }

        setbtnLoading(false);
    }, [cart, product, user]);

    const onClick = async (product) => {
        if (user) {
            try {
                await addToCart(product);
                setIsAdded(true);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            navigate("/login");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Product not found.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 md:px-6 my-6">

            <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
                <Link to="/" className="hover:text-[#003963]">Home</Link>
                <span>/</span>
                <Link to={`/products/${catSlug}`} className="hover:text-[#003963]">
                    {category}
                </Link>
                <span>/</span>
                <span className="text-gray-700 line-clamp-1 max-w-50">
                    {product.name}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

                <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-sm flex items-center justify-center">
                    <img
                        src={`${baseURL}${product.images[0]}`}
                        alt={product.name}
                        className="object-contain h-60 md:h-96 transition-transform duration-300 hover:scale-105"
                    />
                </div>

                <div className="lg:col-span-2 flex flex-col gap-4">

                    <h1 className="text-xl md:text-3xl font-semibold text-gray-800 leading-snug">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sit aliquid asperiores minus odio dicta libero, quia veniam quas.
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-2xl md:text-4xl font-bold text-[#003963]">
                            ₹{product.price}
                        </span>

                        <span className="text-sm text-green-600 font-medium">
                            In Stock
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">

                        {btnLoading ? (
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
                        ) : isAdded ? (
                            <button
                                onClick={() => navigate("/cart")}
                                className="px-5 py-2.5 rounded-full border border-[#003963] text-[#003963] hover:bg-[#003963] hover:text-white transition"
                            >
                                View Cart
                            </button>
                        ) : (
                            <button
                                onClick={() => onClick(product)}
                                className="px-5 py-2.5 rounded-full bg-[#003963] text-white hover:bg-[#0056a3] transition"
                            >
                                Add to Cart
                            </button>
                        )}

                        <button className="px-5 py-2.5 rounded-full border border-gray-300 hover:border-black transition">
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;