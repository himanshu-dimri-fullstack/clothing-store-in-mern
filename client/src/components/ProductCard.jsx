const ProductCard = ({ product }) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    return (
        <div className="h-full flex flex-col group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div className="relative bg-linear-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
                <img
                    src={`${baseURL}${product.images[0]}`}
                    className="w-full h-32 md:h-44 object-contain transition-transform duration-300 group-hover:scale-110"
                    alt={product.name}
                />

                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                    New
                </span>
            </div>

            <div className="px-4 pt-3 pb-4 flex flex-col grow">

                <h3 className="text-sm md:text-base font-medium text-gray-800 leading-tight line-clamp-2 h-10.5 overflow-hidden group-hover:text-black transition">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-semibold text-black">
                        ₹{product.price}
                    </span>

                    <button className="text-xs px-3 py-1.5 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                        View
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;