import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [otp, setOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const [emailLoading, setEmailLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const [timeLeft, setTimeLeft] = useState(0);


    // Handle input change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Email validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    // OTP Timer
    useEffect(() => {

        if (!showOtp || timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {
                    return 0;
                }

                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, [showOtp, timeLeft]);


    // Send OTP
    const handleVerifyEmail = async () => {

        try {

            setEmailLoading(true);

            const res = await API.post("/api/signup-verify-email", {
                email: formData.email
            });

            toast.success(res.data.message);

            // Show OTP section
            setShowOtp(true);

            // Start timer
            setTimeLeft(120);

            // Clear old OTP
            setOtp("");

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to send OTP"
            );

        }
        finally {

            setEmailLoading(false);
        }
    };


    // Resend OTP
    const handleResendOtp = async () => {

        try {

            setEmailLoading(true);

            const res = await API.post("/api/signup-verify-email", {
                email: formData.email
            });

            toast.success(
                res.data.message || "OTP resent successfully"
            );

            setOtp("");

            setTimeLeft(120);

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Unable to resend OTP"
            );

        }
        finally {

            setEmailLoading(false);
        }
    };

    const handleVerifyOtp = async () => {

        if (!otp) {

            toast.error("Please enter OTP");

            return;
        }

        try {

            setOtpLoading(true);

            const res = await API.post("/api/signup-verify-otp", {
                email: formData.email,
                otp
            });

            toast.success(res.data.message);

            setEmailVerified(true);

            setShowOtp(false);

            setTimeLeft(0);

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Invalid OTP"
            );

            setEmailVerified(false);
        }
        finally {

            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!emailVerified) {

            toast.error("Please verify your email first");

            return;
        }

        if (formData.password !== formData.confirmPassword) {

            toast.error("Password is not same");

            return;
        }

        try {

            const res = await API.post("/api/signup", formData);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setOtp("");

            setShowOtp(false);

            setEmailVerified(false);

            setTimeLeft(0);

            toast.success(res.data.message);
            navigate("/login")

        }
        catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Signup failed"
            );
        }
    };

    return (

        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">

            <div className="w-full h-full">

                <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 bg-white overflow-hidden">


                    {/* Left Section */}

                    <div className="hidden md:flex flex-col justify-center items-center bg-[#003963] text-white p-10">

                        <h2 className="text-3xl font-bold mb-4">
                            Welcome!
                        </h2>

                        <p className="text-sm text-center">
                            Create your account
                        </p>

                    </div>


                    {/* Right Section */}

                    <div className="flex justify-center items-center">

                        <div className="py-4 md:p-12 w-[70%]">

                            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                Create Account
                            </h2>


                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >


                                {/* Name */}

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
                                        className="w-full px-4 py-1 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="Enter your name"
                                    />

                                </div>


                                {/* Email */}

                                <div>

                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Email Address
                                    </label>


                                    <div className="flex flex-col md:flex-row  gap-2">

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={emailVerified || showOtp}
                                            className={`flex-1 min-w-0 px-4 py-1 border border-[#003963] rounded-lg outline-none ${emailVerified || showOtp
                                                ? "bg-gray-100 cursor-not-allowed"
                                                : "focus:ring-2 focus:ring-[#003963]"
                                                }`}
                                            placeholder="Enter your email"
                                        />


                                        {/* EMAIL VERIFY / RESEND BUTTON */}

                                        <button
                                            type="button"

                                            disabled={
                                                !isValidEmail(formData.email) ||
                                                emailLoading ||
                                                emailVerified ||
                                                (timeLeft > 0)
                                            }

                                            onClick={
                                                timeLeft > 0
                                                    ? undefined
                                                    : showOtp
                                                        ? handleResendOtp
                                                        : handleVerifyEmail
                                            }

                                            className={`px-4 py-1 rounded-lg text-sm font-medium text-white transition ${emailVerified
                                                ? "bg-green-600 cursor-default"
                                                : timeLeft > 0
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : isValidEmail(formData.email)
                                                        ? "bg-[#003963] hover:bg-[#02497c]"
                                                        : "bg-gray-400 cursor-not-allowed"
                                                }`}
                                        >

                                            {emailLoading
                                                ? "Sending..."
                                                : emailVerified
                                                    ? "Verified"
                                                    : timeLeft > 0
                                                        ? "Verify"
                                                        : showOtp
                                                            ? "Resend OTP"
                                                            : "Verify"
                                            }

                                        </button>

                                    </div>

                                </div>


                                {/* OTP */}

                                {showOtp && !emailVerified && (

                                    <div>

                                        <label className="block text-sm font-medium text-gray-600 mb-1">
                                            Enter OTP
                                        </label>


                                        <div className="flex gap-2">

                                            <input
                                                type="text"
                                                maxLength={4}
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(
                                                        e.target.value.replace(/\D/g, "")
                                                    )
                                                }
                                                className="flex-1 min-w-0 px-4 py-1 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none tracking-[6px]"
                                                placeholder="Enter OTP"
                                            />


                                            <button
                                                type="button"
                                                disabled={
                                                    otp.length !== 4 ||
                                                    otpLoading ||
                                                    timeLeft === 0
                                                }
                                                onClick={handleVerifyOtp}
                                                className={`px-4 py-1 rounded-lg text-sm font-medium text-white transition ${otp.length === 4 && timeLeft > 0
                                                    ? "bg-[#003963] hover:bg-[#02497c]"
                                                    : "bg-gray-400 cursor-not-allowed"
                                                    }`}
                                            >

                                                {otpLoading
                                                    ? "Checking..."
                                                    : "Verify OTP"
                                                }

                                            </button>

                                        </div>


                                        {/* Timer */}

                                        {timeLeft > 0 && (

                                            <div className="mt-3 text-center">

                                                <p className="text-sm text-gray-500">

                                                    OTP expires in{" "}

                                                    <span className="font-semibold text-[#003963]">

                                                        {Math.floor(timeLeft / 60)}:
                                                        {String(timeLeft % 60).padStart(2, "0")}

                                                    </span>

                                                </p>

                                            </div>

                                        )}

                                    </div>

                                )}


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
                                        className="w-full px-4 py-1 border border-[#003963] rounded-lg focus:ring-2 focus:ring-[#003963] outline-none"
                                        placeholder="Enter password"
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


                                {/* Signup */}

                                <button
                                    type="submit"
                                    disabled={!emailVerified}
                                    className={`w-full text-white py-2 rounded-lg transition duration-300 ${emailVerified
                                        ? "bg-[#003963] hover:bg-[#02497c]"
                                        : "bg-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Sign Up
                                </button>


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

export default Signup;
