import { useEffect, useState } from "react";
import { createCategory } from "../api/category.js";

const Category = () => {
    const [name, setName] = useState("");

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slug = generateSlug(name);

        const categoryData = {
            "name": name,
            "slug": slug
        }

        const category = await createCategory(categoryData);
        // console.log(category)

    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* FORM */}
            <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Add Category
                </h2>

                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003963]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg text-white bg-[#003963]">
                        Add
                    </button>
                </form>
            </div>

            {/* CATEGORY LIST */}
            {/* <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">All Categories</h2>

                {categories.length === 0 ? (
                    <p className="text-gray-500">No categories found</p>
                ) : (
                    <div className="space-y-3">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex justify-between items-center border p-3 rounded-lg"
                            >
                                <span className="font-medium">{cat.name}</span>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="bg-yellow-400 px-4 py-1 rounded text-white"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="bg-red-500 px-4 py-1 rounded text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default Category;