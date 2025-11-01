import cors from "cors"
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"
import productRoutes from "./src/routes/productRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";


const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send('✅ E-Commerce API running'));
app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 4646;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));