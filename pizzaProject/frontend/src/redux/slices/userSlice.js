import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const userRegister = createAsyncThunk(
    "user/fetchUserRegister",
    async (params) => {
        const {username, password} = params
        var credentialobject = {
            "username" : username,
            "password" : password,
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/account/register/', credentialobject);
            localStorage.setItem('accessToken', JSON.stringify(response.data.access));
            localStorage.setItem('refreshToken', JSON.stringify(response.data.refresh));
            return response.status;
        } catch (error) {
            console.error(error);
            throw error; // Ловим и выбрасываем ошибку дальше
        }
    }
);


const initialState = {
    username: null,
    status: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.status = true;
        },
        removeUser(action) {
            action.username = null;
            action.status = false;
        }
    }
})

export const selectUsername = (state) => state.user.username;
export const selectStatus = (state) => state.user.status;

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;