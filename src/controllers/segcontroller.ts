import { Request, Response } from "express";
import Segment from "../models/Segment"

// Create a new customer segment
export const createSegment = async (req: Request, res: Response) => {
  try {
    const { rules } = req.body;
    const segment = new Segment({ rules });
    await segment.save();
    res.status(201).json({ segment });
  } catch (error) {
    res.status(500).json({ message: "Error creating segment", error });
  }
};

// Get all customer segments
export const getSegments = async (req: Request, res: Response) => {
  try {
    const segments = await Segment.find();
    res.status(200).json({ segments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching segments", error });
  }
};

