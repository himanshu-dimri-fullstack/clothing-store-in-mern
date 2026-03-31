import { Users, ShoppingCart, Package, IndianRupee, Layers, Grid3X3 } from "lucide-react";

const Home = () => {

    const stats = [
        {
            title: "Total Users",
            value: "1,245",
            icon: <Users size={22} />,
        },
        {
            title: "Orders",
            value: "320",
            icon: <ShoppingCart size={22} />,
        },
        {
            title: "Revenue",
            value: "₹45,000",
            icon: <IndianRupee size={22} />,
        },
    ];

    const catalogStats = [
        {
            title: "Categories",
            value: "12",
            icon: <Layers size={22} />,
        },
        {
            title: "SubCategories",
            value: "35",
            icon: <Grid3X3 size={22} />,
        },
        {
            title: "Products",
            value: "120",
            icon: <Package size={22} />,
        },
    ];

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm">{item.title}</p>
                                <h2 className="text-xl font-semibold mt-1">{item.value}</h2>
                            </div>

                            <div className="bg-blue-100 p-3 rounded-full">
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4">Catalog Overview</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catalogStats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition border-l-4 border-[#003963]"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{item.title}</p>
                                    <h2 className="text-xl font-semibold mt-1">{item.value}</h2>
                                </div>

                                <div className="bg-blue-100 p-3 rounded-full">
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

                <div className="space-y-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="flex justify-between border-b pb-2 text-sm"
                        >
                            <span>Order #ORD00{item}</span>
                            <span className="text-gray-500">₹{item * 500}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;