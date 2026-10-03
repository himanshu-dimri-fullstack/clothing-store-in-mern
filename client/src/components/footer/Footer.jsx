import { Link } from "react-router-dom";
import { Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full bg-[#141212] text-white border-t border-white/10">

            <div className="container mx-auto px-5 sm:px-8 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

                    {/* Brand */}
                    <div className="md:pr-8">
                        <h2 className="text-2xl font-bold tracking-wide mb-4">
                            Clothing Store
                        </h2>

                        <p className="text-sm leading-7 text-gray-400 max-w-sm">
                            Discover stylish and comfortable fashion for every
                            occasion. Explore our collection and find your
                            perfect style.
                        </p>
                    </div>


                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Shop Categories
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <Link
                                to="/products/men"
                                className="group flex items-center gap-1 w-fit text-gray-400 hover:text-white transition duration-300"
                            >
                                Men
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
                                />
                            </Link>

                            <Link
                                to="/products/women"
                                className="group flex items-center gap-1 w-fit text-gray-400 hover:text-white transition duration-300"
                            >
                                Women
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
                                />
                            </Link>

                            <Link
                                to="/products/kids"
                                className="group flex items-center gap-1 w-fit text-gray-400 hover:text-white transition duration-300"
                            >
                                Kids
                                <ArrowUpRight
                                    size={14}
                                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300"
                                />
                            </Link>
                        </div>
                    </div>


                    {/* Contact / CTA */}
                    <div>
                        <h3 className="text-lg font-semibold mb-5">
                            Find Your Style
                        </h3>

                        <p className="text-sm leading-6 text-gray-400 mb-5">
                            Browse our latest collections and discover
                            something you'll love.
                        </p>

                        <Link
                            to="/products/men"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-200 transition duration-300"
                        >
                            Explore Collection
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                </div>


                {/* Bottom */}
                <div className="border-t border-white/10 mt-10 pt-6">

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-gray-500 text-center sm:text-left">
                            © {new Date().getFullYear()} Clothing Store.
                            All rights reserved.
                        </p>

                        <a
                            href="https://www.linkedin.com/in/himanshu-dimri-932999270"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition duration-300"
                        >
                            <span>Developed by</span>

                            <span className="font-semibold text-white group-hover:text-blue-400 transition duration-300">
                                Himanshu Dimri
                            </span>

                            <Linkedin
                                size={17}
                                className="text-blue-500 group-hover:scale-110 transition duration-300"
                            />
                        </a>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
