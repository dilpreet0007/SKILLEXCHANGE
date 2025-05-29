import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  createOrder,
  getOrders,
  getOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);

export default router; 