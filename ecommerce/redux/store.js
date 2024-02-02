import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';
import orderSlice from './slices/orderSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    auth: authSlice,
    order: orderSlice
  },
});

export default store;
