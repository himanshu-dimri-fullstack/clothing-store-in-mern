import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

const Product = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [editId, setEditId] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const sizeOptions = ["S", "M", "L", "XL"];

    const fetchData = async () => {
        const [catRes, subRes, prodRes] = await Promise.all([
            API.get("/api/categories"),
            API.get("/api/subcategories"),
            API.get("/api/products"),
        ]);

        setCategories(catRes.data);
        setSubCategories(subRes.data);
        setProducts(prodRes.data);
    };

    useEffect(() => {
        fetchData();
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const previews = files.map(file => URL.createObjectURL(file));

        setImages(prev => [...prev, ...files]);
        setPreviewImages(prev => [...prev, ...previews]);
    }

    const handleSizeChange = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter((s) => s !== size));
        } else {
            setSizes([...sizes, size]);
        }
    };

    const handleRemoveImage = (index) => {
        URL.revokeObjectURL(previewImages[index]);

        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (img) => {
        setExistingImages(prev => prev.filter(i => i !== img));
        setDeletedImages(prev => [...prev, img]);
    };

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const slug = generateSlug(name);

        const formData = new FormData();
        formData.append("slug", slug);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", categoryId);
        formData.append("subcategory", subCategoryId);
        formData.append("sizes", JSON.stringify(sizes));

        images.forEach((img) => formData.append("images", img));
        formData.append("deletedImages", JSON.stringify(deletedImages));

        try {
            if (editId) {
                await API.put(`/api/products/${editId}`, formData);
                setSuccessMessage("Updated successfully");
                setEditId(null);
            } else {
                await API.post("/api/products", formData);
                setSuccessMessage("Created successfully");
            }

            setName("");
            setDescription("");
            setPrice("");
            setCategoryId("");
            setSubCategoryId("");
            setSizes([]);
            setImages([]);
            setPreviewImages([]);
            setExistingImages([]);

            fetchData();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Error");
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setCategoryId(item.category?._id);
        setSubCategoryId(item.subcategory?._id);
        setSizes(item.sizes || []);
        setEditId(item._id);
        setExistingImages(item.images || []);
        setImages([]);
        setPreviewImages([]);
        setDeletedImages([]);
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await API.delete(`/api/products/${deleteId}`);
            setSuccessMessage("Deleted successfully");

            setName("");
            setDescription("");
            setPrice("");
            setCategoryId("");
            setSubCategoryId("");
            setSizes([]);
            setImages([]);
            setPreviewImages([]);
            setExistingImages([]);
            setDeletedImages([]);
            setEditId(null);

            fetchData();
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Delete failed");
        } finally {
            setShowModal(false);
            setDeleteId(null);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">

            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-[#ccc] rounded-3xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    {editId ? "Update Product" : "Add Product"}
                </h2>

                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-sm mb-2">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full border border-[#ccc] appearance-none px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]"
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>
                    </div>

                    <div className="relative">
                        <select
                            value={subCategoryId}
                            onChange={(e) => setSubCategoryId(e.target.value)}
                            className="w-full border border-[#ccc] appearance-none px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]"
                        >
                            <option value="">Select SubCategory</option>
                            {subCategories
                                .filter((s) => s.category?._id === categoryId)
                                .map((s) => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                        </select>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>
                    </div>



                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-[#ccc] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-[#ccc] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-[#ccc] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003963]"
                    />

                    <div>
                        <p className="mb-2 font-medium">Sizes</p>
                        <div className="flex gap-4 mb-7">
                            {sizeOptions.map((size) => (
                                <label key={size} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={sizes.includes(size)}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                            id="fileUpload"
                        />

                        <label
                            htmlFor="fileUpload"
                            className="border border-[#ccc] px-4 py-2 text-black rounded-lg cursor-pointer"
                        >
                            Upload Images
                        </label>

                        <div className="flex gap-3 mt-7 flex-wrap">
                            {existingImages.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExistingImage(img)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-7 flex-wrap">
                            {previewImages.map((img, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={img}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-linear-to-r from-[#003963] to-[#005b99] hover:opacity-90 text-white py-3 rounded-xl">
                        {editId ? "Update Product" : "Create Product"}
                    </button>
                </form>
            </div>

            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-[#ccc] rounded-3xl p-6">
                <h2 className="text-2xl font-semibold mb-6">Products</h2>

                <div className="grid gap-4">
                    {products.map((item) => (
                        <div key={item._id} className="p-4 border rounded-2xl flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-500">₹{item.price}</p>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => handleEdit(item)} className="px-4 py-1.5 bg-[#003963] text-white rounded-lg">Edit</button>
                                <button onClick={() => handleDeleteClick(item._id)} className="px-4 py-1.5 bg-red-500 text-white rounded-lg">Delete</button>
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
                            Are you sure you want to delete this product?
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

export default Product;
