import mongoose from "mongoose";

const communicationLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  deliveryTime: { type: Date, default: Date.now },
}, { timestamps: true });

const CommunicationLog = mongoose.model("CommunicationLog", communicationLogSchema);
export default CommunicationLog;
