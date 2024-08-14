const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    leaveError :null,
    leaveSuccess: null,
}

const leaveSlice = createSlice({
    name: 'leaveSlice',
    initialState,
    reducers: {
        setLeaveError: (state, action) => {
            state.leaveError = action.payload;
        },
        setLeaveSuccess: (state, action) => {
            state.leaveSuccess = action.payload;
        },
        clearLeaveMessage: (state) => {
            state.leaveError = null;
            state.leaveSuccess = null;
        }
    }
})

export const { setLeaveError, setLeaveSuccess, clearLeaveMessage } = leaveSlice.actions;
export default leaveSlice.reducer;