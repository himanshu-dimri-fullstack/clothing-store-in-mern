import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { getProducts, getCategory, getCategories } from "../api/api.js"

const ProductsPage = () => {
    const { slug } = useParams();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const [categoryData, productsData, categoriesData] = await Promise.all(
                [
                    getCategory({ slug }),
                    getProducts({ slug }),
                    getCategories()
                ]
            )
            setCategories(categoriesData);
            setCategory(categoryData[0].title);
            setProducts(productsData);
            setLoading(false);
        }
        fetchProducts();
    }, [slug])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 my-6">
            <div className="text-sm text-[#003963] font-semibold mb-6">
                <Link to="/">Home</Link>
                <span className="px-1">/</span>
                <span to="/products/">{category}</span>
            </div>
            <div className="grid grid-cols-12 gap-4">

                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-5 border border-[#eee] rounded-2xl p-4 shadow-sm space-y-6 bg-white">

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Category</h2>
                            <div className="space-y-2 text-sm">
                                {
                                    categories.map((item) => {
                                        return (
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="checkbox" checked={slug === item.slug}
                                                    onChange={() => navigate(`/products/${item.slug}`)} />
                                                {item.title}

                                            </label>
                                        )
                                    })
                                }


                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Product Type</h2>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    T-Shirts
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Shirts
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Hoodies
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" />
                                    Jeans
                                </label>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Size</h2>
                            <div className="flex flex-wrap gap-2">
                                {["S", "M", "L", "XL", "XXL"].map(size => (
                                    <button
                                        key={size}
                                        className="border px-3 py-1 rounded-lg text-sm hover:bg-black hover:text-white transition"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Price</h2>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="price" />
                                    ₹0 - ₹500
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="price" />
                                    ₹500 - ₹1000
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="price" />
                                    ₹1000+
                                </label>
                            </div>
                        </div>

                        <button className="w-full border py-2 rounded-lg text-sm hover:bg-black hover:text-white transition">
                            Clear Filters
                        </button>

                    </div>
                </div>

                <div className="col-span-12 lg:col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            products.map((product) => (
                                <div key={product.id}>
                                    <ProductCard product={product} />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductsPage