import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    sort: {
        name: "по алфавиту",
        sortProperty: "title",
    }
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        }
    }
});

export const selectSort = (state) => state.filter.sort;
export const selectSearch = (state) => state.filter.searchValue;

export const { setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;