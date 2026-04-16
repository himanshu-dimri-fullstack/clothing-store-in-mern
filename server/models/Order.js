import mongoose, { model } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    shippingAddress: {
        fullName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    orderStatus: {
        type: String,
        enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
        default: "placed"
    },

    isDelivered: {
        type: Boolean,
        default: false
    },

    deliveredAt: Date

}, { timestamps: true });

export default mongoose.model("Order", orderSchema)