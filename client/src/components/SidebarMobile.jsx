import { useSearchParams, useNavigate } from "react-router-dom";

const SidebarMobile = ({
    sidebarOpen,
    setSidebarOpen,
    SlidersHorizontal,
    X,
    categories,
    subCategories,
    slug,
    subCatSlug,
    handleSubCategory
}) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = parseInt(searchParams.get("limit")) || 12;

    const handleCategory = (newSlug) => {
        setSearchParams({
            page: 1,
            limit: limit
        });

        navigate(`/products/${newSlug}`);
        setSidebarOpen(false);
    };

    return (
        <>
            <button
                className="lg:hidden mb-4 flex items-center gap-2 border px-3 py-1 rounded-full shadow-sm 
                hover:bg-black hover:text-white transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
            >
                <SlidersHorizontal size={18} />
                <span className="font-medium">Filters</span>
            </button>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 overflow-y-auto shadow-xl">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button
                                className="border px-2 py-1 rounded-lg hover:bg-black hover:text-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="border-b mb-4"></div>

                        <div className="space-y-6">

                            <div>
                                <h2 className="font-semibold text-lg mb-2">Category</h2>
                                {
                                    categories.map(item => (
                                        <label key={item._id} className="flex gap-2">
                                            <input
                                                type="checkbox"
                                                checked={slug === item.slug}
                                                onChange={() => handleCategory(item.slug)}
                                            />
                                            {item.name}
                                        </label>
                                    ))
                                }
                            </div>

                            <div>
                                <h2 className="font-semibold text-lg mb-2">Product Type</h2>
                                {
                                    subCategories.map(subcategory => (
                                        <label key={subcategory._id} className="flex gap-2">
                                            <input
                                                type="checkbox"
                                                checked={subCatSlug === subcategory.slug}
                                                onChange={() => {
                                                    handleSubCategory(subcategory.slug);
                                                    setSidebarOpen(false);
                                                }}
                                            />
                                            {subcategory.name}
                                        </label>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SidebarMobile;