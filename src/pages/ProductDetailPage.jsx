import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { getCategory, getProduct } from "../api/api.js"

const ProductDetailPage = () => {
    const { catSlug, slug } = useParams();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const [categoryData, productData] = await Promise.all(
                [
                    getCategory({ catSlug }),
                    getProduct({ slug })
                ]
            )
            setCategory(categoryData[0].title)
            setProduct(productData);
            setLoading(false);
        }
        fetchProduct();
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>

        </div>
    )
}

export default ProductDetailPage