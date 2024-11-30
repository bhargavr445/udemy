import { configureStore } from "@reduxjs/toolkit";
import UniversityReducer from '../Components/University/store/UniversityStore';
import appStoreReducer from "./App.reducer";
import VehicleReducer from "./Vehicle.reducer";

const store = configureStore({
    reducer: {
        app: appStoreReducer,
        vehicle: VehicleReducer,
        university: UniversityReducer
    }
})

export default store;