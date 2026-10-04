
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify"
const ForgetPassword = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [otp, setOtp] = useState("")
    const [timeLeft, setTimeLeft] = useState(120)

    const handleVerifyEmail = async (e) => {
        e.preventDefault()
        if (!email) {
            toast.error("Enter email")
            return
        }
        try {
            setLoading(true)
            const res = await API.post("/api/forget-password/verify-email", { email })
            toast.success(res?.data?.message)
            setTimeLeft(120)
            setShowOTP(true)
            setLoading(false)
        }
        catch (error) {
            toast.error(error?.response?.data?.message)
            setEmail("")
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault()
        if (!otp) {
            toast.error("OTP is required")
            return
        }
        try {
            setLoading(true)
            const res = await API.post("/api/forget-password/verify-otp", { email, otp })
            toast.success(res?.data?.message)
            setLoading(false)
            setOtp("")
            setEmail("")
            navigate("/reset-password", { state: { email: res?.data?.email } })
        }
        catch (error) {
            toast.error(error?.response?.data?.message)
            setLoading(false)
            setOtp("")
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) return

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [showOTP, timeLeft])


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-5xl mx-auto py-6 md:py-10">

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">


                    {/* Left Section */}

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">

                        <h2 className="text-3xl font-bold mb-4">
                            Forgot Your Password?
                        </h2>

                        <p className="text-sm text-center">
                            Let’s Get You Back In.
                        </p>

                    </div>


                    {/* Login Section */}

                    <div className="flex items-center justify-center">

                        <div className="w-full p-6 sm:p-8 md:p-12 lg:w-[90%]">

                            <form
                                className="space-y-5"
                            >

                                {/* Email */}

                                {
                                    !showOTP &&
                                    <div>

                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 mb-4 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                            placeholder="Enter your email"
                                        />
                                        <button
                                            onClick={handleVerifyEmail}
                                            type="submit"
                                            className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                                        >
                                            {
                                                loading ? "Checking..." : "Verify Email"
                                            }

                                        </button>

                                    </div>
                                }

                                {
                                    showOTP &&
                                    <>
                                        <div>

                                            <input
                                                disabled={timeLeft <= 0}
                                                type="text"
                                                name="otp"
                                                required
                                                value={otp}
                                                maxLength={4}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value.replace(/\D/g, "")
                                                    )
                                                }
                                                className={`${timeLeft <= 0 ? "bg-[#ddd] border border-[#ddd]" : "border border-[#003963]"} w-full px-4 py-2 rounded-lg focus:ring-2 
                                                    focus:ring-[#003963] outline-none`}
                                                placeholder="Enter OTP"
                                            />

                                        </div>
                                        {
                                            timeLeft > 0 &&
                                            <div className="mt-3 text-center">
                                                <p className="text-sm text-gray-500">

                                                    OTP expires in{" "}

                                                    <span className="font-semibold text-[#003963]">

                                                        {Math.floor(timeLeft / 60)}:
                                                        {String(timeLeft % 60).padStart(2, "0")}

                                                    </span>
                                                </p>

                                            </div>
                                        }


                                        {
                                            timeLeft <= 0 ?
                                                <button
                                                    onClick={handleVerifyEmail}
                                                    type="submit"
                                                    className="w-full bg-[#003963] text-white py-2 rounded-lg hover:bg-[#02497c] transition duration-300"
                                                >
                                                    {
                                                        loading ? "Checking..." : "Resend OTP"
                                                    }
                                                </button>
                                                :
                                                <button
                                                    disabled={otp.length < 4}
                                                    onClick={handleVerifyOTP}
                                                    type="submit"
                                                    className={`${otp.length < 4 ? "bg-gray-500" : "bg-[#003963] hover:bg-[#02497c]"} w-full  text-white py-2 rounded-lg transition duration-300`}
                                                >
                                                    {
                                                        loading ? "Checking..." : "Verify OTP"
                                                    }
                                                </button>
                                        }

                                    </>
                                }

                            </form>


                            <p className="text-sm text-gray-600 mt-6 text-center">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="text-[#003963] cursor-pointer hover:underline"
                                >
                                    Login
                                </Link>

                            </p>


                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ForgetPassword;
