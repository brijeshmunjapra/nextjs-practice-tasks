import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
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

const Product = models.Product || model('Product', ProductSchema);

export default Product;