import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sorted, page, search } = params;

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/product/${sorted}${category}${search}${page}`
    );
    return data;
  }
);

const initialState = {
  list: [],
  isLoading: "loading",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setItems(state, action) {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = "loading";
        state.list = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = "error";
        state.list = [];
      });
  },
});

export const selectIsLoading = (state) => state.products.isLoading;
export const selectProducts = (state) => state.products.list;

export const { setItems } = productsSlice.actions;

export default productsSlice.reducer;
