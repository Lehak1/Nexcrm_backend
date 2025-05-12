import { Router } from "express";
import {
  createSegment,
  getSegments,
  previewSegmentAudience
} from "../controllers/segcontroller"; // Adjust the path to where your controller is
import { isAuthenticated, jwtCheck, jwtParse } from "../middleware/Auth";

const router = Router();

// Route to create a new customer segment
router.post("/", createSegment);

// Route to get all customer segments
router.get("/", getSegments);

router.post("/preview", jwtCheck, jwtParse, isAuthenticated, previewSegmentAudience);

export default router;
