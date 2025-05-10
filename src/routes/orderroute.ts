import express from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import { validateOrderRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/Auth"

const router = express.Router();

router.post("/", jwtCheck, jwtParse, validateOrderRequest, createOrder);
router.get("/", jwtCheck, jwtParse, getOrders);

export default router;
