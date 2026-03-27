import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    },
    { timestamps: true }
);

subCategorySchema.index({ slug: 1 });
subCategorySchema.index({ category: 1, slug: 1 }, { unique: true });

export default mongoose.model("SubCategory", subCategorySchema);