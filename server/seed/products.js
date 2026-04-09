import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import connectDB from "../config/db.js";
import dotenv from "dotenv"

dotenv.config();

const generateSlug = (name) => {
    return name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
};

const copyImage = (fileName) => {
    const source = path.join("seed/images", fileName);
    const destination = path.join("uploads", fileName);

    if (!fs.existsSync(destination)) {
        fs.copyFileSync(source, destination);
    }

    return `/uploads/${fileName}`;
};

const productData = {
    "T-Shirts": [
        { name: "Classic Black T-Shirt", image: "t-shirt.jpg" },
        { name: "Classic Red T-Shirt", image: "Red-dark-t-shirt.png" },
        { name: "Classic Blue T-Shirt", image: "blank-blue-polo-shirt.png" },
        { name: "Black T-Shirt", image: "t-shirt.jpg" },
        { name: "Red T-Shirt", image: "Red-dark-t-shirt.png" },
        { name: "Blue T-Shirt", image: "blank-blue-polo-shirt.png" }
    ],
    "Jeans": [
        { name: "Dark Blue Jeans", image: "dark-blue-jean.avif" },
        { name: "Classic Blue Jeans", image: "jean-blue-dark.png" },
        { name: "Trendy Blue Jeans", image: "dark-blue-jean.avif" },
        { name: "Blue Jeans", image: "jean-blue-dark.png" },
        { name: "Fancy Blue Jeans", image: "dark-blue-jean.avif" },
        { name: "Another Blue Jeans", image: "jean-blue-dark.png" }
    ],
    "Dresses": [
        { name: "Pejock women short sleeves", image: "pejock-women-short-sleeves.jpg" },
        { name: "Women slim fit mini dress", image: "women-slim-fit-mini-dress.webp" },
        { name: "Women short sleeves", image: "pejock-women-short-sleeves.jpg" },
        { name: "Slim fit mini dress", image: "women-slim-fit-mini-dress.webp" },
        { name: "Pejock women sleeves", image: "pejock-women-short-sleeves.jpg" },
        { name: "Women slim fit dress", image: "women-slim-fit-mini-dress.webp" }
    ],
    "Tops": [
        { name: "Women red solid top", image: "women-red-solid-top.avif" },
        { name: "Red solid top", image: "women-red-solid-top.avif" },
        { name: "Solid red top", image: "women-red-solid-top.avif" },
        { name: "Women red top", image: "women-red-solid-top.avif" }
    ],
    "Jackets": [
        { name: "Generic stand collar winter jacket", image: "jacket.avif" },
        { name: "Stand collar winter jacket", image: "jacket.avif" },
        { name: "Generic winter jacket", image: "jacket.avif" },
        { name: "Generic stand collar jacket", image: "jacket.avif" },
    ],
    "Hoodies": [
        { name: "Duke urban hoodie", image: "duke-urban-hoodie.webp" },
        { name: "Duke hoodie", image: "duke-urban-hoodie.webp" },
        { name: "Urban hoodie", image: "duke-urban-hoodie.webp" },
        { name: "Hoodie", image: "duke-urban-hoodie.webp" }
    ]
};

const data = [
    { category: "Men", subcategories: ["T-Shirts", "Shirts", "Jeans", "Jackets", "Hoodies"] },
    { category: "Women", subcategories: ["Dresses", "Tops", "Jeans", "Jackets", "Hoodies"] },
    { category: "Kids", subcategories: ["T-Shirts", "Shorts"] }
];

const seedProducts = async () => {
    try {
        await connectDB();
        await Product.deleteMany();

        const products = [];

        for (let item of data) {
            const category = await Category.findOne({ name: item.category });
            if (!category) continue;

            for (let sub of item.subcategories) {
                const subcategory = await Subcategory.findOne({
                    name: sub,
                    category: category._id
                });

                if (!subcategory) continue;

                const items = productData[sub];
                if (!items) continue;

                for (let prod of items) {
                    const fullName = `${item.category} ${prod.name}`;

                    products.push({
                        name: fullName,
                        slug: generateSlug(fullName) + "-" + Date.now(),
                        price: Math.floor(Math.random() * 500) + 300,
                        category: category._id,
                        subcategory: subcategory._id,
                        images: [copyImage(prod.image)],
                        sizes: ["S", "M", "L", "XL"]
                    });
                }
            }
        }

        await Product.insertMany(products);

        console.log("Products Seeded Successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedProducts();