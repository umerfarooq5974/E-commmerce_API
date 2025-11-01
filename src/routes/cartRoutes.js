import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.patch("/item", protect, updateCartItem);
router.delete("/item/:itemId", protect, removeFromCart);

export default router;
