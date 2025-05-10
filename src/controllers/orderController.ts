import { Request, Response } from "express";
import Order from "../models/Order";

// Create order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, amount, status, createdAt } = req.body;
    const order = new Order({ customerId, amount, status, createdAt });
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get all orders
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("customerId");
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
