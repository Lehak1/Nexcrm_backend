import mongoose, { Schema, Document } from 'mongoose';

interface OrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface OrderDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

const OrderSchema = new Schema<OrderDocument>({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
});

export default mongoose.model<OrderDocument>('Order', OrderSchema);
