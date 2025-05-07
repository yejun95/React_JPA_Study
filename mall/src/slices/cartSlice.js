import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartItems} from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

const initState = {
    items: [],
    status: ''
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCartItemsAsync.fulfilled, (state, action) => {
            return {
                items: action.payload,
                status: 'fulfilled'
            }
        }).addCase(getCartItemsAsync.pending, (state, action) => {
            state.status = 'pending'
        }).addCase(getCartItemsAsync.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export default cartSlice.reducer