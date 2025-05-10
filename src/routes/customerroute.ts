import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer
} from "../controllers/customercontroller";

import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateCustomerRequest } from "../middleware/validation";

const router = express.Router();

// 🔐 Protected Routes
router.post("/", jwtCheck, jwtParse, validateCustomerRequest, createCustomer);
router.get("/", jwtCheck, jwtParse, getCustomers);
router.get("/:id", jwtCheck, jwtParse, getCustomerById);
router.put("/:id", jwtCheck, jwtParse, validateCustomerRequest, updateCustomer);

export default router;
