import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import connectDB from "./src/config/db.js";

dotenv.config();
connectDB();
app.use(cors());

const app = express();
const PORT = process.env.PORT || 4646;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));