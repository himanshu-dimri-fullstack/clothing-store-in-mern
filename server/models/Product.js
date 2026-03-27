import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
            required: true
        },

        discountPrice: {
            type: Number
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
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

productSchema.index({ slug: 1 });
productSchema.index({ category: 1, subCategory: 1 });

export default mongoose.model("Product", productSchema);