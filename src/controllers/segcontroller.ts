import { Request, Response } from "express";
import Segment from "../models/Segment"
import Customer from "../models/Customer";
import { applySegmentRules } from "../utils/ruleEngine";
import Campaign from "../models/Campaign";
import CommunicationLog from "../models/CommunicationLog";
import fetch from "node-fetch"; // make sure it's installed if not already

export const previewSegmentAudience = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { rules, combinator } = req.body;

    if (!rules || !Array.isArray(rules)) {
      res.status(400).json({ error: "Invalid or missing rules" });
      return;
    }

    const customers = await Customer.find(); // Fetch all customers
    const matchedCustomers = customers.filter((customer) =>
      applySegmentRules(customer, rules, combinator)
    );

    res.status(200).json({ count: matchedCustomers.length });
  } catch (err) {
    console.error("Error previewing segment:", err);
    res.status(500).json({ error: "Failed to preview segment" });
  }
};




// Create a new customer segment
// export const createSegment = async (req: Request, res: Response) => {
//   try {
//     const { rules } = req.body;
//     const segment = new Segment({ rules });
//     await segment.save();
//     res.status(201).json({ segment });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating segment", error });
//   }
// };




export const createSegment = async (req: Request, res: Response) => {
  try {
    const { name, rules, combinator } = req.body;
    const createdBy = "anonymous"; // You can extract from auth if needed

    // 1. Save segment
    const segment = await Segment.create({ name, rules, combinator, createdBy });

    // 2. Create campaign with same rules
    const campaign = await Campaign.create({ name, rules, createdBy });

    // 3. Get customers
    const customers = await Customer.find();

    // 4. Filter matching customers
    const matched = customers.filter((c) => applySegmentRules(c, rules, combinator));

    // 5. Log and send message
    for (const customer of matched) {
      const message = `Hi ${customer.name}, here’s 10% off on your next order!`;

      await CommunicationLog.create({
        campaignId: campaign._id,
        customerId: customer._id,
        message,
        status: "PENDING",
        timestamp: new Date(),
      });

      await fetch("http://localhost:3000/campaigns/vendor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign._id,
          customerId: customer._id,
          customerName: customer.name,
          message,
        }),
      });
    }

    res.status(201).json({
      message: "Segment and campaign created",
      segment,
      campaign,
    });

  } catch (error) {
    console.error("Error creating segment and campaign:", error);
    res.status(500).json({ message: "Error creating segment and campaign", error });
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


 // utility we'll define next

