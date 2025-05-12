import { Request, Response } from "express";
import Customer from "../models/Customer";

// Create a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, totalSpend, visitCount, lastActiveDate } = req.body;

    const customer = new Customer({
      email,
      name,
      totalSpend,
      visitCount,
      lastActiveDate,
      createdBy: req.userId, // 👈 Associate with logged-in user
    });

    await customer.save();
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

// Get all customers of the logged-in user
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.find({ createdBy: req.userId });
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

// Get single customer only if it belongs to the logged-in user
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({ _id: id, createdBy: req.userId });

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

// Update customer only if it belongs to the logged-in user
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, name, totalSpent, visits, lastActiveAt } = req.body;

    const customer = await Customer.findOneAndUpdate(
      { _id: id, createdBy: req.userId },
      { email, name, totalSpent, visits, lastActiveAt },
      { new: true }
    );

    if (!customer) {
      res.status(404).json({ message: "Customer not found or not authorized" });
      return;
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

// Delete customer only if it belongs to the logged-in user
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const customer = await Customer.findOneAndDelete({ _id: id, createdBy: req.userId });

    if (!customer) {
      res.status(404).json({ message: "Customer not found or not authorized" });
      return;
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};
