import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPageCount(state, action) {
            state.page = action.payload;
        }
    }
});

export const selectPage = (state) => state.pagination.page;

export const { setPageCount } = paginationSlice.actions;

export default paginationSlice.reducer;