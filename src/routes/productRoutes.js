import express from "express";
import { protect } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productControllers.js";

const router = express.Router();
router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", protect, isAdmin, createProduct);
router.post("/:id", protect, isAdmin, updateProduct);
router.post("/:id", protect, isAdmin, deleteProduct);

export default router;
