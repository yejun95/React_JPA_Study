import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";

const initState = {
    email: '',
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            return {
                //email: action.payload.email
            }
        },
        logout: () => {
            return {
                ...initState
            }
        }
    },
    // createAsyncThunk가 동작하는 부분
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log('fulfilled');

            // 서버의 response가 reducer로 매핑됨
            return action.payload;
        })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log('pending');
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log('rejected');
            })
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;