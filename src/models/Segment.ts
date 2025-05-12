import mongoose, { Document, Schema } from "mongoose";


interface ISegment extends Document {
  name: string;
  rules: any[];
  combinator: "AND" | "OR";
  createdBy: string;
}

const segmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rules: {
    type: Array,
    required: true,
  },
  combinator: {
    type: String,
    enum: ["AND", "OR"],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


const Segment = mongoose.model<ISegment>("Segment", segmentSchema);

export default Segment;
