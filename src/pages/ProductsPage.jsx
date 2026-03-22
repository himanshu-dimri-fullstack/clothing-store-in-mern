import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProducts, getCategory, getCategories } from "../api/api.js";
import { SlidersHorizontal, X } from "lucide-react";
import Pagination from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic-light-dark.css';
import Sidebar from "../components/Sidebar.jsx";
import SidebarMobile from "../components/SidebarMobile.jsx";

const ProductsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [filters, setFilters] = useState({
        type: "",
        size: "",
    });

    const [types, setTypes] = useState([]);
    const [sizes, setSizes] = useState([]);

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({
            ...prev,
            [type]: prev[type] === value ? "" : value
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const [categoryData, productsData, categoriesData] = await Promise.all([
                getCategory({ slug }),
                getProducts({ slug, page, limit: 8 }),
                getCategories()
            ]);
            setCategories(categoriesData);
            setCategory(categoryData[0]?.title);
            setAllProducts(productsData.data);
            setProducts(productsData.data);
            setTotalPages(productsData.pages);
            setLoading(false);
            window.scrollTo(0, 0);
        };

        fetchData();
    }, [slug, page]);

    useEffect(() => {
        setPage(1);
    }, [slug]);

    useEffect(() => {
        if (allProducts.length === 0) return;

        const uniqueTypes = [...new Set(allProducts.map(p => p.subCatSlug))];
        const uniqueSizes = [...new Set(allProducts.flatMap(p => p.sizes))];

        setTypes(uniqueTypes);
        setSizes(uniqueSizes);
    }, [allProducts]);

    useEffect(() => {
        let filtered = [...allProducts];

        if (filters.type) {
            filtered = filtered.filter(p => p.subCatSlug === filters.type);
        }

        if (filters.size) {
            filtered = filtered.filter(p => p.sizes.includes(filters.size));
        }

        setProducts(filtered);
    }, [filters, allProducts]);

    const clearFilters = () => {
        setFilters({
            type: "",
            size: "",
        });
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

            <SidebarMobile categories={categories} types={types} sizes={sizes} slug={slug}
                handleFilterChange={handleFilterChange} clearFilters={clearFilters}
                filters={filters} navigate={navigate} sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen} SlidersHorizontal={SlidersHorizontal} X={X} />

            <div className="grid grid-cols-12 gap-4">

                <div className="hidden lg:block lg:col-span-3">
                    <Sidebar categories={categories} types={types} sizes={sizes} slug={slug}
                        handleFilterChange={handleFilterChange} clearFilters={clearFilters}
                        filters={filters} navigate={navigate} />
                </div>

                <div className="col-span-12 lg:col-span-9">

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={page}
                            total={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;