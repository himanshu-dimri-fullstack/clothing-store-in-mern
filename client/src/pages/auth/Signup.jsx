import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Password is not same");
            return;
        }

        try {
            const res = await API.post("/api/signup", formData);
            const data = res.data;
            console.log({ "data": data });
            console.log({ "role": data.user.role });
        }
        catch (error) {
            setErrorMessage(error.response.data.message);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        }



    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center  py-4 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">
                        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                        <p className="text-sm text-center">
                            Create your account
                        </p>
                    </div>

                    <div className="p-8 md:p-12">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                    placeholder="Enter your name"
                                />
                            </div>

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

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                    placeholder="Confirm password"
                                />
                            </div>

                            {
                                errorMessage && <div className="text-red-500 py-2">{errorMessage}</div>
                            }

                            <button
                                type="submit"
                                className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="text-sm text-gray-600 mt-6 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#003963] cursor-pointer hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;