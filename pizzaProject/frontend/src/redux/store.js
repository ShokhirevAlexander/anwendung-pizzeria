import {configureStore} from "@reduxjs/toolkit";

import categoriesSlice from "./slices/categoriesSlice";
import productsSlice from "./slices/productsSlice";
import filterSlice from "./slices/filterSlice";
import paginationSlice from "./slices/paginationSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        filter: filterSlice,
        pagination: paginationSlice,
        cart: cartSlice,
        user: userSlice,
    },
    devTools: true
})
