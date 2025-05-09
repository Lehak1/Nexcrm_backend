import { Request, Response } from "express";
import Campaign from "../models/Campaign"

// Create a new campaign
export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { name, segmentId, messageContent, deliveryStats } = req.body;
    const campaign = new Campaign({
      name,
      segmentId,
      messageContent,
      deliveryStats,
    });
    await campaign.save();
    res.status(201).json({ campaign });
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

// Get all campaigns
export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json({ campaigns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

// Get a specific campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.status(200).json({ campaign });
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaign", error });
  }
};
