import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { getProducts, getCategory } from "../api/api.js"

const ProductsPage = () => {
    const { slug } = useParams();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const [categoryData, productsData] = await Promise.all(
                [
                    getCategory({ slug }),
                    getProducts({ slug })
                ]
            )
            setCategory(categoryData[0].title);
            setProducts(productsData);
            setLoading(false);
        }
        fetchProducts();
    }, [])

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
            <div className="grid grid-cols-12">
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pr-2">
                                <ProductCard product={product} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductsPage