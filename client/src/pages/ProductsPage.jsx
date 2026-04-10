import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Pagination from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic-light-dark.css';
import Sidebar from "../components/Sidebar.jsx";
import SidebarMobile from "../components/SidebarMobile.jsx";
import API from "../api/axios.js"

const ProductsPage = () => {
    const { catSlug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const subCatSlug = searchParams.get("type") || "";

    const fetchData = async () => {
        try {
            setLoading(true);

            const [
                categoryRes,
                productsRes,
                categoriesRes,
                subcategoriesRes
            ] = await Promise.all([
                API.get(`/api/categories/${catSlug}`),
                API.get(`/api/products?category=${catSlug}&subcategory=${subCatSlug}&page=${page}&limit=${limit}`),
                API.get("api/categories"),
                API.get(`/api/subcategories?category=${catSlug}`)
            ]);

            setCategories(categoriesRes.data);
            setSubCategories(subcategoriesRes.data);
            setCategory(categoryRes.data?.name);

            setProducts(productsRes.data.products);
            setTotalPages(productsRes.data.totalPages);

            window.scrollTo(0, 0);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [catSlug, page, subCatSlug]);

    const handlePageChange = (newPage) => {
        const params = {
            page: newPage,
            limit: limit
        };

        if (subCatSlug) {
            params.type = subCatSlug;
        }

        setSearchParams(params);
    };

    const handleSubCategory = (subSlug) => {
        const params = {
            page: 1,
            limit: limit
        };

        if (subSlug !== subCatSlug) {
            params.type = subSlug;
        }

        setSearchParams(params);

        fetchData();

    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 my-6">

            <div className="text-sm text-[#003963] font-semibold mb-6">
                <Link to="/">Home</Link>
                <span className="px-1">/</span>
                <span>{category}</span>
            </div>

            <SidebarMobile
                categories={categories}
                subCategories={subCategories}
                slug={catSlug}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                SlidersHorizontal={SlidersHorizontal}
                X={X}
                subCatSlug={subCatSlug}
                handleSubCategory={handleSubCategory}
            />

            <div className="grid grid-cols-12 gap-4">

                <div className="hidden lg:block lg:col-span-3">
                    <Sidebar
                        categories={categories}
                        subCategories={subCategories}
                        slug={catSlug}
                        subCatSlug={subCatSlug}
                        handleSubCategory={handleSubCategory}
                    />
                </div>

                <div className="col-span-12 lg:col-span-9">

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map(product => (
                            <Link key={product._id} to={`/products/${catSlug}/${product.slug}`}>
                                <ProductCard product={product} />
                            </Link>
                        ))}
                    </div>


                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={page}
                            total={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductsPage;