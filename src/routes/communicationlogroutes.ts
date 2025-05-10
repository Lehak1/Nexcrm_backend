import express from "express";
import { createLog, getLogs } from "../controllers/communicationLogController";
import { jwtCheck, jwtParse } from "../middleware/Auth"
// (Optional) Add validation if you create a validateLogRequest middleware

const router = express.Router();

router.post("/", jwtCheck, jwtParse, createLog);
router.get("/", jwtCheck, jwtParse, getLogs);

export default router;
