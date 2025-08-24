import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const UniversityInitialState = {
    universityApiResponse: [],
    universityApiLoading: false
}

export const UniversitySlice = createSlice({
    name: 'UniversitySlice',
    initialState: UniversityInitialState,
    reducers: {
        onFetchUniversitySuccess(state, action) {
            state.universityApiResponse = action.payload
        },
        isApiLoading(state, action) {
            state.universityApiLoading = action.payload
        }
        
    }
})
export const UniversityActions = UniversitySlice.actions;

export const fetchUniversityData = () => {

    return async (dispatch) => {
        dispatch(UniversityActions.isApiLoading(true));
        const response = await axios.get('http://universities.hipolabs.com/search?country=United+Kingdom');
        console.log(response);
        
        if (response.status !== 200) {
        dispatch(UniversityActions.isApiLoading(false));

            throw new Error('Api call Failed...');
        }        
        response.data.sort((c, p) => c.country > p.country ? 1 : -1)
        dispatch(UniversityActions.isApiLoading(false));
        dispatch(UniversityActions.onFetchUniversitySuccess(response.data))
    }
}

export default UniversitySlice.reducer;