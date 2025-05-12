import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Importing Routes
import customerRouter from "./routes/customerroute";        // Customer Routes
import segmentRouter from "./routes/segroute";          // Segment Routes
import orderRouter from "./routes/orderroute";              // Order Routes
import userRouter from "./routes/userroute";                // User Routes
import campaignRouter from "./routes/campaignroutes";        // Campaign Routes
import communicationRouter from "./routes/communicationlogroutes"; // Communication Routes
import campaignmsgsai from "./routes/campaignmsgsai";

// Connecting to the Database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database");
});

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
}));
app.use(express.json());


// Routes
app.use("/customers", customerRouter);         // Customer routes
app.use("/segments", segmentRouter);           // Segment routes
app.use("/orders", orderRouter);               // Order routes
app.use("/users", userRouter);                 // User routes
app.use("/campaigns", campaignRouter);         // Campaign routes
app.use("/communications", communicationRouter); // Communication routes
app.use('/generateai', campaignmsgsai);
// Test Route
app.get("/test", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route working!" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
