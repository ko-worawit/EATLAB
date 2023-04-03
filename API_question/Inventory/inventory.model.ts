import mongoose, { Document, Schema } from 'mongoose';

interface IInventory extends Document {
  productId: string;
  name: string;
  quantity: number;
}

const inventorySchema: Schema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Inventory = mongoose.model<IInventory>('Inventory', inventorySchema);

export { Inventory, IInventory };
