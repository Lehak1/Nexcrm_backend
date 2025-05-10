import { Request, Response } from "express";
import Customer from "../models/Customer";

// Create a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, totalSpent, visits, lastActiveAt } = req.body;
    const customer = new Customer({
      email,
      name,
      totalSpent,
      visits,
      lastActiveAt,
    });
    await customer.save();
    res.status(201).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

// Get all customers
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error });
  }
};



// Update customer details
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      // Send response directly without returning it
      res.status(404).json({ message: "Customer not found" });
      return; // Return here to prevent further code execution
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};


export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, name, totalSpent, visits, lastActiveAt } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      { email, name, totalSpent, visits, lastActiveAt },
      { new: true }
    );

    if (!customer) {
      // Send response directly without returning it
      res.status(404).json({ message: "Customer not found" });
      return; // Return here to prevent further code execution
    }

    res.status(200).json({ customer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};


// Delete a customer
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      // Do not return the Response object, just send the response directly
      res.status(404).json({ message: "Customer not found" });
      return; // Return here to end the function execution
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};

