
import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { data: {  saloondetails: {},
                            confirmappointmentdetails: {},
                            userdetails: {},
                            } };

export const appointmentsdataSlice = createSlice({
    name: "appointments",
    initialState: { value: initialStateValue },
    reducers: {
        appointmentsdata: (state, action) => {
            state.value = action.payload;
        },

    },
});

export const { appointmentsdata } = appointmentsdataSlice.actions;
export default appointmentsdataSlice.reducer;