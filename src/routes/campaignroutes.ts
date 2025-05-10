// src/routes/campaign.routes.ts

import express from "express";
import {
  createCampaign,
  previewAudience,
  simulateVendorAPI,
  handleDeliveryReceipt,
  getCampaignHistory,
} from "../controllers/campaignController";
import { isAuthenticated, jwtCheck, jwtParse } from "../middleware/Auth";

const router = express.Router();

router.post("/api/campaign", jwtCheck, jwtParse, isAuthenticated, createCampaign);

router.post("/campaign/preview", isAuthenticated, previewAudience);
router.get("/campaign/history", isAuthenticated, getCampaignHistory);

// These two are called by the internal flow/vendor
router.post("/campaign/vendor", simulateVendorAPI);
router.post("/campaign/receipt", handleDeliveryReceipt);

export default router;
