import { useSearchParams, useNavigate } from "react-router-dom";

const Sidebar = ({ categories, subCategories, subCatSlug, slug, handleSubCategory }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = parseInt(searchParams.get("limit")) || 12;

    const handleCategory = (newSlug) => {
        setSearchParams({
            page: 1,
            limit: limit
        });

        navigate(`/products/${newSlug}`);
    };

    const sizes = ["S", "M", "L"];

    return (
        <div className="">

            <div>
                <h2 className="font-semibold text-lg mb-3 text-gray-800">Category</h2>
                <div className="space-y-2">
                    {categories.map(item => (
                        <label
                            key={item.slug}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                checked={slug === item.slug}
                                onChange={() => handleCategory(item.slug)}
                                className="accent-[#003963]"
                            />
                            <span className="text-gray-600 group-hover:text-black transition">
                                {item.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-3 text-gray-800">Product Type</h2>
                <div className="space-y-2">
                    {subCategories.map(sub => (
                        <label
                            key={sub._id}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={subCatSlug === sub.slug}
                                onChange={() => handleSubCategory(sub.slug)}
                                className="accent-[#003963]"
                            />
                            <span className="text-gray-600 group-hover:text-black transition">
                                {sub.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg mb-3 text-gray-800">Size</h2>
                <div className="flex gap-3 flex-wrap">
                    {sizes.map((s) => (
                        <button
                            key={s}
                            className="px-3 py-1.5 border border-gray-300 rounded-full text-sm hover:border-black transition"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Sidebar;