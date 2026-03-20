import ProductCard from "../components/ProductCard"


const Homepage = () => {
    const menProducts = [
        {
            id: 1,
            title: "Duke Urban Boys Hoodie",
            price: "1200",
            src: "/assets/duke-urban-boys-hoodie.webp"
        },
        {
            id: 2,
            title: "Men Dark Demin Blue Jean",
            price: "1200",
            src: "/assets/men-dark-demin-blue-jeans.avif"
        },
        {
            id: 3,
            title: "Men Dark Black T-shirt",
            price: "1200",
            src: "/assets/t-shirt.jpg"
        },
        {
            id: 4,
            title: "Generic Stand Collar Winter Jacket",
            price: "1200",
            src: "/assets/generic-stand-collar-winter-jacket.avif"
        },
        {
            id: 5,
            title: "Duke Urban Boys Hoodie",
            price: "1200",
            src: "/assets/duke-urban-boys-hoodie.webp"
        },
        {
            id: 6,
            title: "Duke Urban Boys Hoodie",
            price: "1200",
            src: "/assets/duke-urban-boys-hoodie.webp"
        }
    ];
    const womenProducts = [
        {
            id: 1,
            title: "Pejock Women Short Sleeves",
            price: "1200",
            src: "/assets/pejock-women-short-sleeves.jpg"
        },
        {
            id: 2,
            title: "Women Slim Fit Mini Dress",
            price: "1200",
            src: "/assets/women-slim-fit-mini-dress.webp"
        },
        {
            id: 3,
            title: "Women Red Solid Top",
            price: "1200",
            src: "/assets/women-red-solid-top.avif"
        },
        {
            id: 4,
            title: "Funky Monkey Hoodie Women",
            price: "1200",
            src: "/assets/funky-monkey-hoodie-women.webp"
        },
        {
            id: 5,
            title: "Blue Dark Women Jean",
            price: "1200",
            src: "/assets/jean-blue-dark-women.png"
        },
        {
            id: 6,
            title: "Women Red Solid Top",
            price: "1200",
            src: "/assets/women-red-solid-top.avif"
        },
    ];
    return (
        <div className="container mx-auto px-3 mt-3">

            <div className="relative">
                <div className="mt-4">
                    <img src="/assets/banner.jpg" className="w-full h-50 md:h-75 lg:h-100 object-cover border border-[#eee] rounded-lg" />
                </div>
                <div className="absolute left-1/10 top-1/2 transform -translate-x-1/10 -translate-y-1/2">
                    <div className="">
                        <h1 className="text-xl lg:text-4xl text-black font-bold mb-3 lg:mb-6">Deals you can't ignore</h1>
                        <button className="text-md lg:text-lg text-white bg-[#003963] border border-[#003963]
                        rounded-4xl px-4 lg:px-8 py-1 lg:py-2 font-semibold hover:bg-transparent hover:text-black">Shop Now</button>
                    </div>
                </div>
            </div>

            <div className="mt-4 md:mt-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl text-black font-bold mb-4 md:mb-6">Suggested for Women</h2>
                <div className="grid grid-cols-12">
                    {
                        womenProducts.map((product) => {
                            return (
                                <div key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pr-2">
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className="mt-4 md:mt-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl text-black font-bold mb-4 md:mb-6">Suggested for Men</h2>
                <div className="grid grid-cols-12">
                    {
                        menProducts.map((product) => {
                            return (
                                <div key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pr-2">
                                    <ProductCard product={product} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Homepage