import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import categoryRoutes from "./routes/categoryRoutes.js"
import subcategoryRoutes from "./routes/subcategoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"

dotenv.config();

const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use("/api", categoryRoutes)
app.use("/api", subcategoryRoutes)
app.use("/api", productRoutes)
app.use("/api", userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on port:", PORT);
})