const { createSlice } = require("@reduxjs/toolkit");

const userNavbarSlice = createSlice({
    name: 'activeBtn',
    initialState: {
        activeBtn : 'dashboard'
    },
    reducers: {
        setUserActiveBtn: (state, action) => {
            state.activeBtn = action.payload;
        },
        clearActiveBtn: (state) => {
            state.activeBtn = 'dashboard';
        }
    }
})

export const { setUserActiveBtn, clearActiveBtn } = userNavbarSlice.actions;
export default userNavbarSlice.reducer;