
const SidebarMobile = ({ sidebarOpen, setSidebarOpen, SlidersHorizontal, X, categories, types, sizes, handleFilterChange, clearFilters, slug, filters, navigate }) => {
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

            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>

                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                ></div>

                <div
                    className={`absolute left-0 top-0 h-full w-72 bg-white p-4 overflow-y-auto
                    transition-transform duration-300
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <button
                        className="mb-4 border px-3 py-1 rounded"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={18} /> Close
                    </button>

                    <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>

                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                            onClick={() => setSidebarOpen(false)}
                        ></div>

                        <div
                            className={`absolute right-0 top-0 h-full w-80 max-w-full bg-white p-5 overflow-y-auto
        shadow-2xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
                        >

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
        </>
    )
}

export default SidebarMobile