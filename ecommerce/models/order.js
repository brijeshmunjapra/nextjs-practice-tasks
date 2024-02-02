import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  qty: {
    type: Number,
    // required: [true, "Qty is required."],
  },
  name: {
    type: String,
    // required: [true, "Product name is required."],
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    // required: [true, "Price is required."],
  },
  category: {
    type: String,
    // required: [true, "Category is required."],
  },
});

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [productSchema],
  totalPrice: {
    type: Number,
    default: 0,
  }
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
