import mongoose, { Document, Schema } from "mongoose";


const segmentSchema = new Schema(
  {
    rules: {
      type: Array, 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

interface ISegment extends Document {
  rules: any[]; 
}

const Segment = mongoose.model<ISegment>("Segment", segmentSchema);

export default Segment;
