import {
    ChevronDown,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import Pagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic-light-dark.css';

const selectClass =
    "w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition";

const ProductsPage = () => {
    const { catSlug } = useParams()
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handlePagination = async (page_no) => {

        try {
            setLoading(true)
            const res = await API.get(`/api/products/category/${catSlug}?page=${page_no}&limit=12`)
            setPage(page_no)
            setLoading(false)
            setProducts(res.data.products)
            setTotalPages(res.data.totalPages)
        }
        catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/api/products/category/${catSlug}?page=${page}&limit=12`)
                console.log(res.data.products)
                setLoading(false)
                setProducts(res.data.products)
                setTotalPages(res.data.totalPages)
            }
            catch (error) {
                console.log(error?.response?.data?.message)
            }
        }
        fetchProduct()
    }, [])
    return (
        <div className="min-h-screen bg-[#fafafa]">

            {/* ================= HEADER ================= */}
            <div className="container mx-auto px-4 md:px-6 pt-6">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <span className="hover:text-gray-900 cursor-pointer">
                        Home
                    </span>

                    <span>/</span>

                    <span className="text-gray-900 font-medium">
                        Men's Clothing
                    </span>
                </div>

                {/* ================= STICKY FILTERS ================= */}
                <div className="sticky top-25 lg:top-15 z-40 mb-8">

                    <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg shadow-black/4 p-2">

                        {/* Select Filters */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

                            {/* Category */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Category</option>
                                    <option>Men</option>
                                    <option>Women</option>
                                    <option>Kids</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>


                            {/* Subcategory */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Subcategory</option>
                                    <option>T-Shirts</option>
                                    <option>Shirts</option>
                                    <option>Jeans</option>
                                    <option>Hoodies</option>
                                    <option>Jackets</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>


                            {/* Size */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Size</option>
                                    <option>XS</option>
                                    <option>S</option>
                                    <option>M</option>
                                    <option>L</option>
                                    <option>XL</option>
                                    <option>XXL</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>


                            {/* Color */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Color</option>
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Blue</option>
                                    <option>Green</option>
                                    <option>Grey</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>


                            {/* Price */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Price Range</option>
                                    <option>Under ₹500</option>
                                    <option>₹500 - ₹1,000</option>
                                    <option>₹1,000 - ₹2,000</option>
                                    <option>₹2,000+</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>


                            {/* Sort */}
                            <div className="relative">
                                <select className={selectClass}>
                                    <option>Sort By</option>
                                    <option>Newest</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Popular</option>
                                </select>

                                <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                                />
                            </div>

                        </div>

                    </div>

                </div>

                {
                    loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
                        </div>
                    )
                        :
                        <>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pb-10">

                                {products.map((product) => (

                                    <Link
                                        to={`/products/${product.category.slug}/${product.subcategory.slug}/${product.slug}`}
                                        key={product._id}
                                        className="h-full"
                                    >
                                        <ProductCard product={product} />
                                    </Link>

                                ))}

                            </div>


                            <div className="flex items-center justify-center gap-2 pb-14">

                                <Pagination
                                    current={page}
                                    total={totalPages}
                                    onPageChange={handlePagination}
                                />

                            </div>

                        </>
                }

            </div>

        </div>
    );
};

export default ProductsPage;