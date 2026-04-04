import { useEffect, useState } from "react";
import API from "../api/axios";

const Subcategory = () => {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [editId, setEditId] = useState(null);

    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCategories = async () => {
        const res = await API.get("/api/categories");
        setCategories(res.data);
    };

    const fetchSubCategories = async () => {
        const res = await API.get("/api/subcategories");
        setSubCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, []);

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

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

        if (!categoryId) {
            return setErrorMessage("Please select category");
        }

        const data = {
            name,
            slug: generateSlug(name),
            category: categoryId,
        };

        try {
            if (editId) {
                await API.put(`/api/subcategories/${editId}`, data);
                setSuccessMessage("Updated successfully");
                setEditId(null);
            } else {
                await API.post("/api/subcategories", data);
                setSuccessMessage("Created successfully");
            }

            setName("");
            setCategoryId("");
            fetchSubCategories();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Error");
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setCategoryId(item.category?._id || item.category);
        setEditId(item._id);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await API.delete(`/api/subcategories/${deleteId}`);
            setSuccessMessage("Deleted successfully");
            fetchSubCategories();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Delete failed");
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-gray-100 rounded-3xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    {editId ? "Update SubCategory" : "Add SubCategory"}
                </h2>

                {errorMessage && (
                    <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-600 text-sm mb-2">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full border border-[#ccc] appearance-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#003963] outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter subcategory name"
                        className="w-full border border-[#ccc] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#003963] outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button className="w-full bg-linear-to-r from-[#003963] to-[#005b99] hover:opacity-90 text-white py-3 rounded-xl font-medium transition">
                        {editId ? "Update SubCategory" : "Create SubCategory"}
                    </button>
                </form>
            </div>

            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-gray-100 rounded-3xl p-6">
                <h2 className="text-2xl font-semibold mb-6">SubCategories</h2>

                <div className="grid gap-4">
                    {subCategories.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center p-4 rounded-2xl border border-[#ccc] hover:shadow-md transition"
                        >
                            <div>
                                <p className="font-semibold text-lg">
                                    {item.name}
                                </p>

                                <span className="inline-block mt-1 text-xs bg-[#003963]/10 text-[#003963] px-3 py-1 rounded-full">
                                    {item.category?.name || "No Category"}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-4 py-1.5 rounded-lg bg-[#003963] text-white hover:bg-[#002944] transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteClick(item._id)}
                                    className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-80 shadow-2xl">
                        <h3 className="text-lg font-semibold mb-2">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this subcategory?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-1.5 rounded-lg border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subcategory;