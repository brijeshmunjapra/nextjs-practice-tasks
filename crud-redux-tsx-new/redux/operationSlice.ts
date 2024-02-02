import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AddPostPayloadType, OperationState, PayloadType, UpdatePostPayloadType } from "../utils/Types"


const initialState: OperationState = {
  data: [],
  apiData: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("cart/fetchPosts", async () => {
  const response = await axios.get("http://localhost:3000/api/get");
  console.log(response.data, "GET API called");
  return response.data;
});

export const addPost = createAsyncThunk(
  "cart/addPost",
  async (payload: AddPostPayloadType) => {
    const response = await axios.post(
      "http://localhost:3000/api/create",
      payload
    );
    console.log(response.data, "POST API called");
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "cart/deletePost",
  async (payload: string) => {
    const data = { id: payload };
    const response = await axios.delete("http://localhost:3000/api/delete", {
      data,
    });
    console.log(response.data, "DELETE API called");
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "cart/updatePost",
  async (payload: UpdatePostPayloadType) => {
    const response = await axios.put(
      "http://localhost:3000/api/update",
      payload
    );
    console.log(response.data, "PUT API called");
    return response.data;
  }
);

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
    deleteOperation: (state, action: PayloadAction<string>) => {
      const temp = state.data.filter((item) => {
        return item !== action.payload;
      });
      state.data = temp;
    },
    updateOperation: (state, action: PayloadAction<PayloadType>) => {
      const idx = state.data.findIndex(
        (item) => item === action.payload.itemTobeEdit
      );
      state.data[idx] = action.payload.post;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiData = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { addOperation, deleteOperation, updateOperation } =
  operationsSlice.actions;

export default operationsSlice.reducer;
