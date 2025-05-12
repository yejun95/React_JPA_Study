import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartItems, postChangeCart} from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param) => {
    return postChangeCart(param)
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
            state.items = action.payload
            state.status = 'fulfilled'
        }).addCase(getCartItemsAsync.pending, (state, action) => {
            state.status = 'pending'
        }).addCase(getCartItemsAsync.rejected, (state, action) => {
            state.status = 'rejected'
        }).addCase(postChangeCartAsync.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'fulfilled'
        }).addCase(postChangeCartAsync.pending, (state, action) => {
            state.status = 'pending'
        }).addCase(postChangeCartAsync.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export default cartSlice.reducer