const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    signupErrors: null,
    loginError: null,
    userDetails: null,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setSignupErrors: (state, action) => {
            state.signupErrors = action.payload;
        },

        setLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        clearUserDetails: (state) => {
            state.userDetails = null;
        }
    }
})

export const { setSignupErrors, setLoginError, setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer