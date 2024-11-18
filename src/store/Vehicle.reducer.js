import { createSlice } from "@reduxjs/toolkit";

const VehicleInitialState = {
    vehicleApiResponse: { name: 'Api Resp' }
}

export const VehicleSlice = createSlice({
    name: 'VehicleSlice',
    initialState: VehicleInitialState,
    reducers: {
        onFetchVehicleSuccess(state, action) {
            state.vehicleApiResponse = action.payload
        }
    }
})

export const VehicleActions = VehicleSlice.actions;

export default VehicleSlice.reducer;