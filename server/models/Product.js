import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter name"],
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String
        },

        price: {
            type: Number,
            required: [true, "Enter price"]
        },

        discountPrice: {
            type: Number
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory",
            required: true
        },

        images: [
            {
                type: String
            }
        ],

        sizes: [
            {
                type: String
            }
        ],

        colors: [
            {
                type: String
            }
        ],

    },
    { timestamps: true }
);

productSchema.index({ subcategory: 1 })
productSchema.index({ category: 1, subcategory: 1 });

export default mongoose.model("Product", productSchema);