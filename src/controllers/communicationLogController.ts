import { Request, Response } from "express";
import CommunicationLog from "../models/CommunicationLog"

// Create a new communication log entry
export const createLog = async (req: Request, res: Response) => {
  try {
    const { campaignId, userId, status } = req.body;
    const log = new CommunicationLog({
      campaignId,
      userId,
      status,
    });
    await log.save();
    res.status(201).json({ log });
  } catch (error) {
    res.status(500).json({ message: "Error creating log entry", error });
  }
};

// Get all communication logs
export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await CommunicationLog.find();
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};
