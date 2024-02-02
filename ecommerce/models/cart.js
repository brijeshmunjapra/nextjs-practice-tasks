import { Schema, model, models } from 'mongoose';

const cartSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  qty: {
    type: Number,
    required: [true, 'qty is required.'],
  },
  name: {
    type: String,
    required: [true, 'Product is required.'],
  },
  details: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  }
});

const Cart = models.Cart || model('Cart', cartSchema);

export default Cart;