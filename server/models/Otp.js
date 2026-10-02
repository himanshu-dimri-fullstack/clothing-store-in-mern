import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Enter Email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    otp: {
        type: String,
        required: [true, "Enter Password"],
    },
    otpExpiresAt: {
        type: Date,
    }
}, { timestamps: true });

export default mongoose.model("Otp", otpSchema);