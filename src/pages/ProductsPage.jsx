import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProducts, getCategory, getCategories } from "../api/api.js";
import { ClosedCaptionIcon, Hamburger, HamburgerIcon, LucideHamburger, SlidersHorizontal, X } from "lucide-react";

const ProductsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [sidebarOpen, setSidebarOpen] = useState(false); // 🔥 NEW

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
                getProducts({ slug }),
                getCategories()
            ]);

            setCategories(categoriesData);
            setCategory(categoryData[0]?.title);

            setAllProducts(productsData);
            setProducts(productsData);

            setLoading(false);
        };

        fetchData();
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

        if (slug) {
            filtered = filtered.filter(p => p.catSlug === slug);
        }

        if (filters.type) {
            filtered = filtered.filter(p => p.subCatSlug === filters.type);
        }

        if (filters.size) {
            filtered = filtered.filter(p => p.sizes.includes(filters.size));
        }

        setProducts(filtered);
    }, [filters, allProducts, slug]);

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

            {/* Breadcrumb */}
            <div className="text-sm text-blue-700 font-semibold mb-6">
                <Link to="/">Home</Link>
                <span className="px-1">/</span>
                <span>{category}</span>
            </div>

            {/* 🔥 Mobile Filter Button */}
            <button
                className="lg:hidden mb-4 flex items-center gap-2 border px-3 py-1 rounded-full shadow-sm 
    hover:bg-black hover:text-white transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
            >
                <SlidersHorizontal size={18} />
                <span className="font-medium">Filters</span>
            </button>
            {/* 🔥 Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>

                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                ></div>

                {/* Drawer */}
                <div
                    className={`absolute left-0 top-0 h-full w-72 bg-white p-4 overflow-y-auto
                    transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <button
                        className="mb-4 border px-3 py-1 rounded"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕ Close
                    </button>

                    {/* FILTERS */}
                    {/* 🔥 Mobile Sidebar (PRO VERSION) */}
                    <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>

                        {/* Overlay with blur */}
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                            onClick={() => setSidebarOpen(false)}
                        ></div>

                        {/* Right Drawer */}
                        <div
                            className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white p-5 overflow-y-auto
        shadow-2xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Filters</h2>
                                <button
                                    className="border px-2 py-1 rounded-lg hover:bg-black hover:text-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="border-b mb-4"></div>

                            {/* FILTERS */}
                            <div className="space-y-6">

                                <div>
                                    <h2 className="font-semibold text-lg mb-2">Category</h2>
                                    {
                                        categories.map(item => (
                                            <label key={item.slug} className="flex gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={slug === item.slug}
                                                    onChange={() => {
                                                        navigate(`/products/${item.slug}`);
                                                        setSidebarOpen(false);
                                                    }}
                                                />
                                                {item.title}
                                            </label>
                                        ))
                                    }
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg mb-2">Product Type</h2>
                                    {
                                        types.map(type => (
                                            <label key={type} className="flex gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.type === type}
                                                    onChange={() => handleFilterChange("type", type)}
                                                />
                                                {type}
                                            </label>
                                        ))
                                    }
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg mb-2">Size</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => handleFilterChange("size", size)}
                                                    className={`border px-3 py-1 rounded-lg transition
                                ${filters.size === size ? "bg-black text-white" : "hover:bg-gray-100"}`}
                                                >
                                                    {size}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>

                                <button
                                    onClick={clearFilters}
                                    className="w-full border py-2 rounded-lg hover:bg-black hover:text-white transition"
                                >
                                    Clear Filters
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-12 gap-4">

                {/* Desktop Sidebar */}
                <div className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-5 border border-[#ccc] rounded-2xl p-4 shadow-sm space-y-6 bg-white">

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Category</h2>
                            {
                                categories.map(item => (
                                    <label key={item.slug} className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={slug === item.slug}
                                            onChange={() => navigate(`/products/${item.slug}`)}
                                        />
                                        {item.title}
                                    </label>
                                ))
                            }
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Product Type</h2>
                            {
                                types.map(type => (
                                    <label key={type} className="flex gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filters.type === type}
                                            onChange={() => handleFilterChange("type", type)}
                                        />
                                        {type}
                                    </label>
                                ))
                            }
                        </div>

                        <div>
                            <h2 className="font-semibold text-lg mb-2">Size</h2>
                            <div className="flex flex-wrap gap-2">
                                {
                                    sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => handleFilterChange("size", size)}
                                            className={`border px-3 py-1 rounded-lg
                                            ${filters.size === size ? "bg-black text-white" : ""}`}
                                        >
                                            {size}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="w-full border py-2 rounded-lg hover:bg-black hover:text-white"
                        >
                            Clear Filters
                        </button>

                    </div>
                </div>

                {/* Products */}
                <div className="col-span-12 lg:col-span-9">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductsPage;