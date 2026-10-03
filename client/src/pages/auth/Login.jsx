
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate();

    const { user, setUser, loading } = useContext(AuthContext);

    const [btnloading, setBtnLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (formData.email == "") {
            toast.error("Email is required")
        }
        if (formData.password == "") {
            toast.error("Password is required")
        }

        try {
            setBtnLoading(true)
            const res = await API.post("/api/login", formData);

            const data = res.data;

            if (data.user.role == "admin") {
                setBtnLoading(false)
                toast.success(data.message);
                setUser(data);


                setFormData({
                    email: "",
                    password: "",
                });

                navigate("/admin", { replace: true });

            }
            else {
                setBtnLoading(false)
                toast.success(data.message);
                setUser(data.user);

                setFormData({
                    email: "",
                    password: "",
                });

                navigate("/", { replace: true });

            }

        }
        catch (error) {
            setBtnLoading(false)
            toast.error(error?.response?.data?.message);

            setFormData({
                email: "",
                password: "",
            });

        }
    };


    if (loading) {

        return (
            <div className="flex justify-center items-center h-screen">

                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#003963] rounded-full animate-spin"></div>

            </div>
        );
    }

    if (user) {
        return <Navigate to="/admin" />;
    }


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-5xl mx-auto py-6 md:py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">


                    {/* Left Section */}

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">

                        <h2 className="text-3xl font-bold mb-4">
                            Welcome Back
                        </h2>

                        <p className="text-sm text-center">
                            Login to access your dashboard.
                        </p>

                    </div>


                    {/* Login Section */}

                    <div className="flex items-center justify-center">

                        <div className="w-full p-6 sm:p-8 md:p-12 lg:w-[90%]">

                            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
                                Login to your account
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >

                                {/* Email */}

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
                                        className="w-full px-4 py-2 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="Enter your email"
                                    />

                                </div>


                                {/* Password */}

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
                                        className="w-full px-4 py-2 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="Enter password"
                                    />

                                </div>


                                {/* Forgot Password */}

                                <div className="flex items-center justify-end text-sm">

                                    <Link to="/forget-password" className="text-[#003963] cursor-pointer hover:underline">
                                        Forgot Password?
                                    </Link>

                                </div>


                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                                >
                                    {
                                        btnloading ? "Wait..." : "Login"
                                    }

                                </button>

                            </form>


                            {/* Signup */}

                            <p className="text-sm text-gray-600 mt-6 text-center">

                                Don’t have an account?

                                <Link
                                    to="/signup"
                                    className="text-[#02497c] pl-2 font-bold cursor-pointer hover:underline"
                                >
                                    Sign Up
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;
