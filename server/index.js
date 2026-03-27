import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server started on port 3000");
})