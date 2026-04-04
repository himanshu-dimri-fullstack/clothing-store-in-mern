import { useEffect, useState } from "react";
import API from "../api/axios";

const Category = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [categories, setCategories] = useState([]);

    const [editId, setEditId] = useState(null);

    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchCategories();
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

        setErrorMessage("");
        setSuccessMessage("");

        const slug = generateSlug(name);

        const categoryData = {
            name,
            slug,
        };

        try {
            if (editId) {
                await API.put(`/api/categories/${editId}`, categoryData);
                setSuccessMessage("Category Updated successfully");
                setEditId(null);
                fetchCategories();
            } else {
                await API.post("/api/categories", categoryData);
                setSuccessMessage("Category Created successfully");
                fetchCategories();
            }

            setName("");
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setEditId(item._id);
        setErrorMessage("");
        setSuccessMessage("");
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await API.delete(`/api/categories/${deleteId}`);
            setSuccessMessage("Category Deleted successfully");
            fetchCategories();
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Delete failed");
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">

            <div className="bg-white/70 backdrop-blur-lg border border-gray-100 shadow-xl rounded-3xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    {editId ? "Update Category" : "Add Category"}
                </h2>

                {errorMessage && (
                    <p className="text-red-500 mb-2 text-sm">{errorMessage}</p>
                )}
                {successMessage && (
                    <p className="text-green-600 mb-2 text-sm">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="flex gap-4">
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
                        {editId ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            <div className="bg-white/70 backdrop-blur-lg border border-gray-100 shadow-xl rounded-3xl p-6">
                <h2 className="text-2xl font-semibold mb-6">All Categories</h2>

                {categories.length === 0 ? (
                    <p className="text-gray-500">No categories Available</p>
                ) : (
                    <div className="space-y-4">
                        {categories.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center p-4 rounded-2xl border border-[#ccc] hover:shadow-md transition"
                            >
                                <span className="font-semibold text-lg">
                                    {item.name}
                                </span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-4 py-1.5 rounded-lg bg-[#003963] text-white hover:bg-[#002944] transition"
                                    >
                                        Update
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
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-6 w-80 shadow-2xl">
                        <h3 className="text-lg font-semibold mb-2">
                            Confirm Delete
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this category?
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

export default Category;