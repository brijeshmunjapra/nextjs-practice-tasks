import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAction = createAsyncThunk(
    'auth/loginAction',
    async (payload) => {
      try {
        const response = await axios.post("http://localhost:3000/api/login", payload);
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userName", response?.data?.user)
        localStorage.setItem("userId", response?.data?.userId)

        return response.data;
      } catch (error) {
        alert(error.message)
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    logoutAction: (state)=>{
    state.data = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { logoutAction } = authSlice.actions
export default authSlice.reducer;
