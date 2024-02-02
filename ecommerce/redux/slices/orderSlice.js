import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (payload) => {
    const response = await axios.post(
      "http://localhost:3000/api/orders",
      payload
    );
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload) => {
    const response = await axios.post(
      "http://localhost:3000/api/orders/create",
      payload
    );
    return response.data;
  }
);



const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    createdOrder:null,
    isOrderCreated: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdOrder = action.payload;
        state.isOrderCreated = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
