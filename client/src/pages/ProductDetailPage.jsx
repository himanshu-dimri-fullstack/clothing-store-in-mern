import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ChevronRight,
    ShoppingBag,
    Check,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

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
            const exist = cart.find(
                (item) => item.product._id === product._id
            );

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

    // Loading
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    // Product not found
    if (!product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Product not found
                </h2>

                <Link
                    to="/"
                    className="mt-4 text-sm text-[#003963] hover:underline"
                >
                    Go back home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-gray-500 mb-7 md:mb-10">

                <Link
                    to="/"
                    className="hover:text-[#003963] transition-colors"
                >
                    Home
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                <Link
                    to={`/products/${catSlug}`}
                    className="hover:text-[#003963] transition-colors"
                >
                    {category}
                </Link>

                <ChevronRight size={14} className="text-gray-400" />

                <span className="text-gray-800 font-medium truncate max-w-45 sm:max-w-xs">
                    {product.name}
                </span>

            </div>


            {/* Product */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">

                {/* ================= IMAGE ================= */}

                <div className="w-full">

                    <div className="relative bg-[#f7f7f7] rounded-2xl sm:rounded-3xl overflow-hidden min-h-85 sm:min-h-105 md:min-h-120 flex items-center justify-center">

                        {/* Subtle background */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/3 -translate-y-1/3"></div>

                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-100 rounded-full -translate-x-1/3 translate-y-1/3"></div>

                        <img
                            src={`${baseURL}${product.images[0]}`}
                            alt={product.name}
                            className="relative z-10 w-full h-75 sm:h-95 md:h-110 lg:h-125 object-contain p-6 sm:p-8 transition-transform duration-500 hover:scale-105"
                        />

                    </div>

                    {/* Small information row */}
                    <div className="grid grid-cols-2 gap-3 mt-4">

                        <div className="border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <ShieldCheck
                                    size={18}
                                    className="text-gray-700"
                                />
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                                    Secure Shopping
                                </p>

                                <p className="text-[10px] sm:text-xs text-gray-500">
                                    Safe & reliable
                                </p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                <Check
                                    size={18}
                                    className="text-gray-700"
                                />
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                                    Quality Assured
                                </p>

                                <p className="text-[10px] sm:text-xs text-gray-500">
                                    Premium products
                                </p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* ================= DETAILS ================= */}

                <div className="flex flex-col lg:pt-3">

                    {/* Category */}
                    <span className="w-fit text-xs sm:text-sm uppercase tracking-widest text-gray-500 font-medium">
                        {category}
                    </span>


                    {/* Product Name */}
                    <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {product.name}
                    </h1>


                    {/* Rating / Stock */}
                    <div className="flex items-center gap-3 mt-4">

                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>

                            <span className="text-sm text-green-600 font-medium">
                                In Stock
                            </span>
                        </div>

                        <span className="text-gray-300">|</span>

                        <span className="text-sm text-gray-500">
                            Premium Collection
                        </span>

                    </div>


                    {/* Price */}
                    <div className="mt-6">

                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                            ₹{product.price}
                        </span>

                    </div>


                    {/* Description */}
                    <p className="mt-5 text-sm sm:text-base text-gray-600 leading-7 max-w-xl">
                        Discover premium quality and timeless style with this
                        carefully selected product. Designed for comfort,
                        everyday wear and a refined look.
                    </p>


                    {/* Divider */}
                    <div className="border-t border-gray-200 my-7"></div>


                    {/* Highlights */}
                    <div className="space-y-4">

                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Check size={16} />
                            </div>

                            <span className="text-sm text-gray-700">
                                Premium quality product
                            </span>

                        </div>


                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Check size={16} />
                            </div>

                            <span className="text-sm text-gray-700">
                                Carefully selected collection
                            </span>

                        </div>


                        <div className="flex items-center gap-3">

                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Check size={16} />
                            </div>

                            <span className="text-sm text-gray-700">
                                Easy and secure shopping
                            </span>

                        </div>

                    </div>


                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">

                        {btnLoading ? (

                            <div className="w-7 h-7 border-2 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>

                        ) : isAdded ? (

                            <button
                                onClick={() => navigate("/cart")}
                                className="w-full sm:flex-1 px-6 py-3.5 rounded-xl border-2 border-[#003963] text-[#003963] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#003963] hover:text-white transition-all duration-300"
                            >
                                <ShoppingBag size={18} />
                                View Cart
                            </button>

                        ) : (

                            <button
                                onClick={() => onClick(product)}
                                className="w-full sm:flex-1 px-6 py-3.5 rounded-xl bg-[#003963] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#02497c] shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <ShoppingBag size={18} />
                                Add to Cart
                            </button>

                        )}

                        <Link
                            to={`/products/${catSlug}`}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                        >
                            <ArrowLeft size={17} />
                            Continue Shopping
                        </Link>

                    </div>


                    {/* Bottom note */}
                    <div className="mt-8 pt-5 border-t border-gray-100">

                        <p className="text-xs sm:text-sm text-gray-500 leading-6">
                            Have questions about this product? Contact us for
                            more information and assistance.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailPage;