import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetail = createAsyncThunk(
  "productDetail/fetchPizzas",
  async () => {

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/product/`
    );
    return data;
  }
);

const initialState = {
  list: [],
  isLoading: "loading",
};

const productDetailSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setDetailProduct(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state) => {
        state.isLoading = "loading";
        state.list = [];
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = "success";
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = "error";
        state.list = [];
      });
  },
});

export const { setDetailProduct } = productDetailSlice.actions;

export default productDetailSlice.reducer;