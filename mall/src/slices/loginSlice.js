import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, removeCookie, setCookie} from "../util/cookieUtil";

const initState = {
    email: '',
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('member');

    return memberInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => loginPost(param));

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState, // cookie 값을 먼저 쓰고 없다면 initState 사용
    reducers: {
        login: (state, action) => {
            return {
                //email: action.payload.email
            }
        },
        logout: () => {
            removeCookie('member');

            return {
                ...initState
            }
        }
    },
    // createAsyncThunk가 동작하는 부분
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log('fulfilled');

            const payload = action.payload;

            if (!payload.error) {
                setCookie("member", JSON.stringify(payload));
            }

            // 서버의 response가 reducer로 매핑됨
            return payload;
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