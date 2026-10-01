import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Show = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
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

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await API.delete(`/api/categories/${deleteId}`);
            toast.success("Category Deleted successfully");
            fetchCategories();
        } catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    const handleCreateCategory = () => {
        navigate("/admin/category/add")
    }

    const handleEdit = (slug) => {
        navigate(`/admin/category/edit/${slug}`)
    }
    return (
        <div className="p-6 max-w-4xl mx-auto">

            <div className="bg-white/70 backdrop-blur-lg border border-gray-100 shadow-xl rounded-3xl p-6">
                <div className="flex flex-col md:flex-row  justify-between mb-5">
                    <h2 className="text-lg md:text-2xl font-semibold mb-6">All Categories</h2>
                    <button onClick={handleCreateCategory}
                        className="px-4 h-8 md:h-10 text-sm rounded-lg bg-[#003963] text-white hover:bg-[#002944] transition"
                    >
                        Create Category
                    </button>
                </div>

                {categories.length === 0 ? (
                    <p className="text-gray-500">No categories Available</p>
                ) : (
                    <div className="space-y-4">
                        {categories.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center py-2 px-4 rounded-2xl border border-[#ccc] hover:shadow-md transition"
                            >
                                <span className="font-semibold text-lg">
                                    {item.name}
                                </span>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(item.slug)}
                                        className="px-4 py-1.5 text-sm rounded-lg bg-[#003963] text-white hover:bg-[#002944] transition"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleDeleteClick(item._id)}
                                        className="px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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

export default Show;