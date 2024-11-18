import { configureStore } from "@reduxjs/toolkit";
import VehicleReducer from "./Vehicle.reducer";
import appStoreReducer from "./App.reducer";

const store = configureStore({
    reducer: {
        app: appStoreReducer,
        vehicle: VehicleReducer
    }
})

export default store;