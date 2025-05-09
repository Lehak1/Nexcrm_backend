import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpend: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
