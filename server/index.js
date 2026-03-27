import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import userRoutes from "./routes/categoryRoutes.js"
import cors from "cors"

dotenv.config();

const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use("/api", userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on port 3000");
})