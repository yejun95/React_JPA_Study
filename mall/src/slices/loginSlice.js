import {createSlice} from "@reduxjs/toolkit";

const initState = {
    email: '',
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            return {
                email: action.payload.email
            }
        },
        logout: () => {
            return {
                ...initState
            }
        }
    }
})

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;