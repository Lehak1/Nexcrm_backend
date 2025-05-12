import mongoose, { Schema, Document } from 'mongoose';


export interface ICommunicationLog extends Document {
  campaignId: string;
  customerId: string;
  status: 'PENDING' | 'SENT' | 'FAILED';  // ✅ include PENDING here
  message: string;
  timestamp: Date;
}

const CommunicationLogSchema: Schema = new Schema({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  status: {
    type: String,
    enum: ['PENDING', 'SENT', 'FAILED'],  // ✅ add PENDING here too
    required: true
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ICommunicationLog>('CommunicationLog', CommunicationLogSchema);

