import express from "express";
import { protect } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderControllers.js";

const router = express.Router();
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.patch("/:orderId/status", protect, isAdmin, updateOrderStatus);

export default router;