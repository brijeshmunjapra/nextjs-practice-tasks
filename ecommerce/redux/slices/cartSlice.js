import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (payload) => {
  const response = await axios.post("http://localhost:3000/api/cart", payload);
  return response.data;
});

export const addInCart = createAsyncThunk("cart/addInCart", async (payload) => {
  const response = await axios.post(
    "http://localhost:3000/api/cart/addInCart",
    payload
  );
  return response.data;
});

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (payload) => {
    const response = await axios.delete(
      "http://localhost:3000/api/cart/removeFromCart",
      {
        data: payload,
        responseType: "json",
      }
    );
    return response.data;
  }
);

export const increaseQty = createAsyncThunk(
  "cart/increaseQty",
  async (payload) => {
    const response = await axios.post(
      "http://localhost:3000/api/cart/increase-quantity",
      {
        payload,
        responseType: "json",
      }
    );
    return response.data;
  }
);

export const decreaseQty = createAsyncThunk(
  "cart/decreaseQty",
  async (payload) => {
    const response = await axios.post(
      "http://localhost:3000/api/cart/decrease-quantity",
      {
        payload,
        responseType: "json",
      }
    );
    return response.data;
  }
);

export const emptyTheCart = createAsyncThunk(
  "cart/emptyTheCart",
  async (payload) => {
    console.log(payload, "payload in slice for empty");
    const response = await axios.post(
      "http://localhost:3000/api/cart/emptyCart",
      payload
    );
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    addedData: [],
    deletedData: [],
    isProductAdded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addInCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isProductAdded = false;
      })
      .addCase(addInCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addedData = action.payload;
        state.error = null;
        state.isProductAdded = true;
      })
      .addCase(addInCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.isProductAdded = false;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deletedData = action.payload;
        state.error = null;
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(increaseQty.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(increaseQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(increaseQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(decreaseQty.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(decreaseQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(decreaseQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(emptyTheCart.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(emptyTheCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(emptyTheCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
