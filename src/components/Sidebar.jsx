
const Sidebar = ({ categories, types, sizes, handleFilterChange, clearFilters, slug, filters, navigate }) => {
    return (
        <div>
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
    )
}

export default Sidebar