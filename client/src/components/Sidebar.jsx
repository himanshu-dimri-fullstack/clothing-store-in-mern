import { useSearchParams, useNavigate } from "react-router-dom";

const Sidebar = ({ categories, subCategories, subCatSlug, slug, handleSubCategory }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const limit = parseInt(searchParams.get("_per_page")) || 8;

    const handleCategory = (newSlug) => {
        setSearchParams({
            page: 1,
            limit: limit
        });

        navigate(`/products/${newSlug}`);
    };

    const sizes = ["S", "M", "L"];

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
                                    onChange={() => handleSubCategory(subcategory.slug)}
                                />
                                {subcategory.name}
                            </label>
                        ))
                    }
                </div>

                <div>
                    <h2 className="font-semibold text-lg mb-2">Size</h2>
                    <div className="flex gap-4">
                        {sizes.map((s) => (
                            <label key={s} className="flex gap-2">
                                <input
                                    type="checkbox"
                                />
                                {s}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;