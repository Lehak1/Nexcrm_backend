import { Router } from "express";
import {
  createSegment,
  getSegments
} from "../controllers/segcontroller"; // Adjust the path to where your controller is

const router = Router();

// Route to create a new customer segment
router.post("/", createSegment);

// Route to get all customer segments
router.get("/", getSegments);


export default router;
