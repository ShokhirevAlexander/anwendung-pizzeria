import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getCategories = createAsyncThunk(
    "categories/getCategories", 
    async () => {
        const {data} = await axios.get(
            'http://127.0.0.1:8000/api/category/'
        );
        return data;
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        isLoading: false,
        categoryId: 0
    },
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.list = payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const selectCategories = (state) => state.categories.list;
export const selectCategoryId = (state) => state.categories.categoryId;

export const { setCategoryId } = categoriesSlice.actions;

export default categoriesSlice.reducer;