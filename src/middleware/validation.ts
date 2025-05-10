import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};


// Validate user creation request
export const validateUserRequest = [
  body("auth0Id").isString().notEmpty().withMessage("auth0Id is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("name").optional().isString().withMessage("Name must be a string"),
  handleValidationErrors,  // This will catch validation errors
];

// Validate customer request
export const validateCustomerRequest = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("totalSpent").isNumeric().withMessage("Total spent must be a number"),
  body("visits").isInt({ min: 0 }).withMessage("Visits must be a non-negative integer"),
  body("lastActiveAt").optional().isISO8601().toDate().withMessage("Invalid date format"),
  handleValidationErrors,  // This will catch validation errors
];

// Validate order request
export const validateOrderRequest = [
  body("customerId").isMongoId().withMessage("Valid customerId is required"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount must be a positive number"),
  body("status").isIn(["pending", "completed", "cancelled"]).withMessage("Invalid status"),
  body("createdAt").optional().isISO8601().toDate().withMessage("Invalid createdAt format"),
  handleValidationErrors,  // This will catch validation errors
];

// Validate segment request
export const validateSegmentRequest = [
  body("name").isString().notEmpty().withMessage("Segment name is required"),
  body("conditions").isArray({ min: 1 }).withMessage("At least one condition is required"),
  body("conditions.*.field").isString().withMessage("Field must be a string"),
  body("conditions.*.operator").isString().withMessage("Operator must be a string"),
  body("conditions.*.value").exists().withMessage("Value is required"),
  handleValidationErrors,  // This will catch validation errors
];

// Validate campaign request
export const validateCampaignRequest = [
  body("segmentId").isMongoId().withMessage("Valid segmentId is required"),
  body("messageTemplate")
    .isString()
    .notEmpty()
    .withMessage("Message template is required"),
  handleValidationErrors,  // This will catch validation errors
];
