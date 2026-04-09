
const ProductCard = ({ product }) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    return (
        <div className='p-2 border border-[#eee] shadow-sm rounded-lg mb-4'>
            <div>
                <img src={`${baseURL}${product.images[0]}`} className='w-full h-20 md:h-40 object-contain' />
            </div>
            <div className='mt-3'>
                <h3 className='text-sm text-black mb-2 line-clamp-2'>{
                    product.name.length > 20 ?
                        product.name.slice(0, 20) + "..."
                        : product.name
                }</h3>

                <span className='text-lg text-black font-semibold'>₹{product.price}</span>

            </div>
        </div>
    )
}

export default ProductCard