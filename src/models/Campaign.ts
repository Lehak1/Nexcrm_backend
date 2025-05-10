import mongoose, { Schema, Document } from 'mongoose';

export interface CampaignRule {
  field: 'totalSpent' | 'visits' | 'lastActiveAt';
  operator: '>' | '<' | '>=' | '<=' | '==' | '!=';
  value: number | string;
  condition?: 'AND' | 'OR';
}

export interface ICampaign extends Document {
  name: string;
  rules: CampaignRule[];
  createdBy: string;
  createdAt: Date;
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  rules: [
    {
      field: String,
      operator: String,
      value: Schema.Types.Mixed,
      condition: { type: String, enum: ['AND', 'OR'] },
    },
  ],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);