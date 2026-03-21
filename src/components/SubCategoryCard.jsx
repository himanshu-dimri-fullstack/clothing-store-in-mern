
const SubCategoryCard = ({ item }) => {
    return (
        <div className='p-2 border border-[#eee] shadow-sm rounded-lg mb-2 text-black
        hover:bg-[#003963] hover:text-white'>
            <div className='mt-3'>
                <h3 className='text-sm sm:text-md font-semibold mb-2 text-center'>{item.title}</h3>
            </div>
        </div>
    )
}

export default SubCategoryCard