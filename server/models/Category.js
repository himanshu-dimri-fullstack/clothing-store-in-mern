import mongoose from "mongoose";
import Subcategory from "./Subcategory.js";
import Product from "./Product.js";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter name"],
            unique: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    },
    { timestamps: true }
);


categorySchema.pre("findOneAndDelete", async function () {

    const category = await this.model.findOne(this.getFilter());

    if (!category) return next();

    const subcategories = await Subcategory.find({ category: category._id });

    const subcategoryIds = subcategories.map(sub => sub._id);

    await Product.deleteMany({
        subcategory: { $in: subcategoryIds }
    });

    await Subcategory.deleteMany({
        category: category._id
    });

});


export default mongoose.model("Category", categorySchema);