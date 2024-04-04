import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCartFromLs } from "../../utils/getCartFromLs";

import updateRefreshToken from "../../utils/sessionCookieSetter";

const {items, totalPrice} = getCartFromLs();

export const basketProducts = createAsyncThunk(
    "basket/fetchBasketStatus",
    async (items) => {
        try {
            const token = await updateRefreshToken();
            const headers = {
                "Authorization": `Bearer ${token}`,
            }
            const { data } = await axios.post(
              'http://127.0.0.1:8000/api/basket/', items, { headers }
            );
            return data;
        } catch (error) {
            throw error; // Перехватываем ошибку и выбрасываем ее дальше
        }
    }
);

const initialState = {
    totalPrice,
    items,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const { id, size, type } = action.payload;
            const findItem = state.items.find(obj => obj.id === id && obj.size === size && obj.type === type);

            if(findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return Number(obj.price * obj.count) + sum;
            }, 0)
        },
        minusItem(state, action) {
            const { id, size, type } = action.payload;
            const findItem = state.items.find(obj => obj.id === id && obj.size === size && obj.type === type);

            if(findItem) {
                findItem.count--;
            }
        },
        removeItem(state, action) {
            const { id, size, type } = action.payload;
            state.items = state.items.filter((obj) => !(obj.id === id && obj.size === size && obj.type === type));
        },
        clearItem(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
});

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
