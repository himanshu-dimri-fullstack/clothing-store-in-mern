import mongoose from "mongoose";
import Product from "../models/Product.js"

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter name"],
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

subCategorySchema.pre("findOneAndDelete", async function () {

    const subcategory = await this.model.findOne(this.getFilter());
    if (subcategory) {
        await Product.deleteMany({
            subcategory: subcategory._id
        });
    }

});

export default mongoose.model("Subcategory", subCategorySchema);