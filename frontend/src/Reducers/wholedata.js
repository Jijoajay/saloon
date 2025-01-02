import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { data: {  saloondetails: {},
servicedetails: {},
stylishdetails: {},
} };

export const wholedataSlice = createSlice({
    name: "wholedata",
    initialState: { value: initialStateValue },
    reducers: {
        wholedatacredentials: (state, action) => {
            state.value = action.payload;
        },
    },
});


export const { wholedatacredentials } = wholedataSlice.actions;
export default wholedataSlice.reducer;