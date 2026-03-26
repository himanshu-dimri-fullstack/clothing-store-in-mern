import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react";
import { getProducts, getSubCategories } from "../api/api.js"
import SubCategoryCard from "../components/SubCategoryCard.jsx";


const Homepage = () => {
    const [loading, setLoading] = useState(true);
    const [womenProducts, setWomenProducts] = useState([]);
    const [menProducts, setMenProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const menSlug = "men";
            const womenSlug = "women";
            const [fetchMenProducts, fetchWomenProducts] = await Promise.all(
                [
                    getProducts({ "catSlug": menSlug }),
                    getProducts({ "catSlug": womenSlug })
                ]
            );
            setMenProducts(fetchMenProducts);
            setWomenProducts(fetchWomenProducts);
            setLoading(false);
        }
        fetchProducts();
    }, [])


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

            {
                loading &&


                <div className="flex justify-center items-center h-screen">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>
                </div>

            }

            {
                womenProducts.length > 0 &&

                <div className="mt-4 md:mt-6">
                    <div className="flex justify-between">
                        <h2 className="text-lg sm:text-xl lg:text-2xl text-black font-bold mb-4 md:mb-6">Suggested for Women</h2>
                        <div className="text-md text-[rgb(0,57,99)] font-semibold">
                            <Link to="/products/women">Explore All</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        {
                            womenProducts.slice(0, 12).map((product) => {
                                return (
                                    <Link to={`/products/women/${product.slug}`} key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pr-2">
                                        <ProductCard product={product} />
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            }

            {
                menProducts.length > 0 &&
                <div className="mt-4 md:mt-6">
                    <div className="flex justify-between">
                        <h2 className="text-lg sm:text-xl lg:text-2xl text-black font-bold mb-4 md:mb-6">Suggested for Men</h2>
                        <div className="text-md text-[rgb(0,57,99)] font-semibold">
                            <Link to="/products/men">Explore All</Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        {
                            menProducts.slice(0, 12).map((product) => {
                                return (
                                    <Link to={`/products/men/${product.slug}`} key={product.id} className="col-span-6 md:col-span-3 lg:col-span-2 pr-2">
                                        <ProductCard product={product} />
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            }



        </div>
    )
}

export default Homepage