import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import API from "../api/axios";

const CategoryForm = ({ slug }) => {

    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

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
            name,
            slug,
        };

        try {
            if (editId) {
                await API.put(`/api/categories/${editId}`, categoryData);
                toast.success("Category Updated successfully");
                setEditId(null);
            } else {
                await API.post("/api/categories", categoryData);
                toast.success("Category Created successfully");
            }

            setName("");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something went wrong");
        }
    };
    useEffect(() => {
        if (!slug) return
        const fetchCategory = async () => {
            try {
                const res = await API.get(`/api/categories/${slug}`);
                setEditId(res.data._id)
                setName(res.data.name)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchCategory()
    }, [])
    return (
        <div className="h-full w-full bg-white/70 backdrop-blur-lg border border-gray-100 shadow-xl rounded-3xl p-6 mb-8">
            <h2 className="text-2xl text-center font-semibold mb-4">
                {slug ? "Update Category" : "Add Category"}
            </h2>
            <div className="flex justify-center items-center">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%]">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="flex-1 px-4 py-3 rounded-xl border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#003963]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-white bg-linear-to-r from-[#003963] to-[#005b99] hover:opacity-90 transition"
                    >
                        {slug ? "Update" : "Add"}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default CategoryForm