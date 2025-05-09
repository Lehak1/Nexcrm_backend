import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  amount: { type: Number, required: true },
  items: [{ name: String, quantity: Number }],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
