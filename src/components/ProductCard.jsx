
const ProductCard = ({ product }) => {
    return (
        <div className='p-2 border border-[#eee] shadow-sm rounded-lg mb-4'>
            <div>
                <img src={product.thumbnail} className='w-full h-20 md:h-40 object-contain' />
            </div>
            <div className='mt-3'>
                <h3 className='text-sm text-black mb-2 line-clamp-2'>{
                    product.title.length > 20 ?
                        product.title.slice(0, 20) + "..."
                        : product.title
                }</h3>

                <span className='text-lg text-black font-semibold'>₹{product.price}</span>

            </div>
        </div>
    )
}

export default ProductCard