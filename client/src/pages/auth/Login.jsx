import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/api/login", formData);
            const data = res.data;
            if (data.user.role == "admin") {
                setUser(data);
                setErrorMessage("");
                navigate("/admin");
            }
            else {
                setUser(data.user);
                setErrorMessage("");
                navigate("/");
            }
        }
        catch (error) {
            setErrorMessage(error.response.data.message)
            setFormData({
                email: "",
                password: "",
            })
        }
    }

    useEffect(() => {
        if (!errorMessage) return;

        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 5000);

        return () => clearTimeout(timer);
    }, [errorMessage]);


    return (
        <div className="md:min-h-screen bg-gray-100 md:flex md:items-center md:justify-center px-4">
            <div className="container mx-auto py-10 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">
                        <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                        <p className="text-sm text-center">
                            Login to access your dashboard.
                        </p>
                    </div>

                    <div className="p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Login to your account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                    placeholder="Enter password"
                                />
                            </div>

                            {
                                errorMessage && <span className="text-red-500 py-2">{errorMessage}</span>
                            }

                            <div className="flex items-center justify-end text-sm">
                                <span className="text-[#003963] cursor-pointer hover:underline">
                                    Forgot Password?
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-sm text-gray-600 mt-6 text-center">
                            Don’t have an account?
                            <Link to="/signup" className="text-[#02497c] pl-2 font-bold cursor-pointer hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;