import { Request, Response } from 'express';
import Order from '../models/Order';
import Customer from '../models/Customer';

// Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, items, totalAmount } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      res.status(400).json({ message: "Customer not found" });
      return;
    }

    // Create order
    const newOrder = new Order({
      customerId,
      items,
      totalAmount,
      status: 'PENDING', // Default status
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get orders by customer
export const getOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;

    const orders = await Order.find({ customerId }).populate('items.productId');
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Order Status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid order status' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
