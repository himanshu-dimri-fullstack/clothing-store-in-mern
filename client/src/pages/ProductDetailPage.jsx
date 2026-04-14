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
                const productRes = await API.get(`/api/products/${slug}`)
                const data = productRes.data;
                setCategory(data.category.name || "Unknown Category");
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
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
            }
            catch (error) {
                console.log(error.message);
                return;
            }
            setIsAdded(true);
        }
        else {
            navigate("/login");
        }
    }

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
        <div className="container mx-auto px-3 my-6">


            <div className="text-sm text-[#003963] font-semibold mb-6">
                <Link to="/">Home</Link>
                <span className="px-1">/</span>
                <Link to={`/products/${catSlug}`}>{category}</Link>
                <span className="px-1">/</span>
                <span>{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="bg-gray-50 p-4 rounded-lg shadow col-span-1 flex justify-center items-center">

                    <img
                        src={`${baseURL}${product.images[0]}`}
                        alt={product.name}
                        className="object-contain h-50 md:h-90"
                    />
                </div>

                <div className="col-span-1 lg:col-span-2 flex flex-col gap-2 md:gap-4">

                    <h1 className="text-lg md:text-3xl font-bold text-gray-800">
                        {product.name}
                    </h1>

                    <p className="text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aliquid asperiores minus odio dicta libero, quia veniam quas iusto illum ex autem optio rem nesciunt quis dolorum minima eaque corrupti.
                    </p>

                    <div className="flex items-center gap-2 md:gap-4 mt-2">
                        <span className="text-lg md:text-3xl font-bold text-[#003963]">
                            ₹{product.price}
                        </span>
                    </div>

                    <div className="flex gap-4 mt-3 md:mt-6">


                        {
                            btnLoading ?
                                <div className="flex justify-center items-center">
                                    <div className="w-5 h-5 border-2 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
                                </div>
                                :

                                isAdded ?
                                    <button onClick={() => navigate("/cart")} className="border border-[#003963] text-[#003963] py-2 px-3 md:py-3 md:px-6 rounded-lg hover:bg-[#003963] hover:text-white transition">
                                        View Cart
                                    </button>
                                    :
                                    <button onClick={() => onClick(product)} className="bg-[#003963] text-white py-2 px-3 md:py-3 md:px-6 rounded-lg hover:bg-[#0056a3] transition">
                                        Add to Cart
                                    </button>
                        }

                        <button className="border border-[#003963] text-[#003963] py-2 px-3 md:py-3 md:px-6 rounded-lg hover:bg-[#003963] hover:text-white transition">
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;