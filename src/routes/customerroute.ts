import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customercontroller";

import { isAuthenticated, jwtCheck, jwtParse } from "../middleware/Auth";
import { validateCustomerRequest } from "../middleware/validation";

const router = express.Router();

// 🔐 Protected Routes
// router.post("/", jwtCheck, jwtParse, validateCustomerRequest, createCustomer);
// router.get("/", jwtCheck, jwtParse, getCustomers);
// router.get("/:id", jwtCheck, jwtParse, getCustomerById);
// router.put("/:id", jwtCheck, jwtParse, validateCustomerRequest, updateCustomer);


router.post("/", jwtParse, isAuthenticated, createCustomer); // 👈 Added jwtParse here
router.get("/", jwtParse, isAuthenticated, getCustomers);
router.get("/:id", jwtParse, isAuthenticated, getCustomerById);
router.put("/:id", jwtParse, isAuthenticated, updateCustomer);
router.delete("/:id", jwtParse, isAuthenticated, deleteCustomer);
export default router;
