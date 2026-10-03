import { useLocation } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify"
import API from "../../api/axios";

const ResetPassword = () => {
    const navigate = useNavigate();

    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords are not same")
            return
        }

        try {
            setLoading(true)
            const res = await API.post("/api/forget-password/reset-password",
                { email: location.state.email, password: formData.password });

            setLoading(false)
            toast.success(res.data.message)
            setFormData({
                password: "",
                confirmPassword: "",
            })
            navigate("/login")
        }
        catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message)
            setFormData({
                password: "",
                confirmPassword: "",
            })
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-5xl mx-auto py-6 md:py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">


                    {/* Left Section */}

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">

                        <h2 className="text-3xl font-bold mb-4 text-center">
                            Secure Your Account
                        </h2>

                        <p className="text-sm text-center leading-6 text-blue-100">
                            Reset your password and get back to your account securely.
                        </p>

                    </div>


                    {/* Login Section */}

                    <div className="flex items-center justify-center">

                        <div className="w-full p-6 sm:p-8 md:p-12 lg:w-[90%]">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* Password */}

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-1 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="New password"
                                    />

                                </div>

                                {/* Confirm Password */}
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
                                        className="w-full px-4 py-1 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="Confirm password"
                                    />

                                </div>

                                {/* Login Button */}

                                <button
                                    type="submit"
                                    className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                                >
                                    {
                                        loading ? "Wait..." : "Reset Password"
                                    }
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ResetPassword