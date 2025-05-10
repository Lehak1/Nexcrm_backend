import { Request, Response, NextFunction, RequestHandler } from "express";
import Campaign from "../models/Campaign";
import CommunicationLog from "../models/CommunicationLog";
import Customer from "../models/Customer";

// Extend Request to support user (from Auth middleware)
interface AuthenticatedRequest extends Request {
  user?: {
    email?: string;
    name?: string;
    sub?: string;
  };
}

// Helper to apply segment rules
const applyRules = (customer: any, rules: any[]): boolean => {
  return rules.every(rule => {
    const value = customer[rule.field];
    switch (rule.operator) {
      case ">": return value > rule.value;
      case "<": return value < rule.value;
      case ">=": return value >= rule.value;
      case "<=": return value <= rule.value;
      case "==": return value === rule.value;
      case "!=": return value !== rule.value;
      default: return false;
    }
  });
};

// POST /api/campaign - Create campaign
export const createCampaign: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const { name, rules } = req.body;
    const createdBy = req.user?.email || "anonymous";

    const campaign = await Campaign.create({ name, rules, createdBy });

    const customers = await Customer.find();

    for (const customer of customers) {
      const matches = applyRules(customer, rules);
      if (matches) {
        await fetch("http://localhost:5000/api/campaign/vendor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaignId: campaign._id,
            customerId: customer._id,
            customerName: customer.name,
          }),
        });
      }
    }

    res.status(201).json({
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// POST /api/campaign/preview
export const previewAudience: RequestHandler = async (req, res) => {
  try {
    const { rules } = req.body;
    const customers = await Customer.find();
    const matching = customers.filter(c => applyRules(c, rules));

    res.status(200).json({ count: matching.length, customers: matching });
  } catch (error) {
    res.status(500).json({ message: "Error in preview", error });
  }
};

// POST /api/campaign/receipt
export const handleDeliveryReceipt: RequestHandler = async (req, res) => {
  try {
    const { campaignId, customerId, status } = req.body;

    await CommunicationLog.create({
      campaignId,
      customerId,
      status,
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Receipt logged" });
  } catch (error) {
    res.status(500).json({ message: "Error logging receipt", error });
  }
};

// POST /api/campaign/vendor
export const simulateVendorAPI: RequestHandler = async (req, res) => {
  try {
    const { campaignId, customerId, customerName } = req.body;

    const isSuccess = Math.random() < 0.9;
    const status = isSuccess ? "SENT" : "FAILED";

    await fetch("http://localhost:5000/api/campaign/receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, customerId, status }),
    });

    res.status(200).json({ message: `Delivery ${status} for ${customerName}` });
  } catch (error) {
    res.status(500).json({ message: "Error in vendor API", error });
  }
};

// GET /api/campaign/history
export const getCampaignHistory: RequestHandler = async (_req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    const history = await Promise.all(
      campaigns.map(async (camp: any) => {
        const logs = await CommunicationLog.find({ campaignId: camp._id });
        const sent = logs.filter(l => l.status === "SENT").length;
        const failed = logs.filter(l => l.status === "FAILED").length;

        return {
          _id: camp._id,
          name: camp.name,
          createdAt: camp.createdAt,
          total: logs.length,
          sent,
          failed,
        };
      })
    );

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
};
