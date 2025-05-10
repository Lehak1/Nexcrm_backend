import express from "express";
import { createUser, getUserById, getUsers } from "../controllers/usercontroller";
import { validateUserRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/Auth";

const router = express.Router();


router.post("/create",jwtCheck,jwtParse,validateUserRequest,createUser);
router.get("/", jwtCheck, jwtParse, getUsers);
router.get("/:id", jwtCheck, jwtParse, getUserById);


export default router;

