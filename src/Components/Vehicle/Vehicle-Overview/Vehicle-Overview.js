import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VehicleActions } from '../../../store/Vehicle.reducer';
import VehicleCard from '../Vehicle-Card/Vehicle-Card';
import Pagination from '../../../Commons/Components/Pagination';
import VehicleCounter from '../VehicleCounter';
import { useDebounce } from '../../../hooks/useDebounce';

export default function VehicleOverview() {

    const dispatch = useDispatch();

    const debounceValue = useDebounce();

    const apiResp = useSelector((state) => state.vehicle.vehicleApiResponse)
    // console.log(apiResp);

    const [vehicleInfo, setVehicleInfo] = useState(null);
    const [paginatedRecords, setPaginatedRecords] = useState([]);

    function addCustomId(response) {
        setVehicleInfo({ ...response, Results: response?.Results?.map((result) => ({ ...result, customId: `${result.MakeId}${result.VehicleTypeId}` })) })
    }

    const fetchVehicleData = useCallback(async () => {
        const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/ford?format=json`);
        if (!response) {
            throw new Error('Api call failed.')
        }
        addCustomId(response?.data)
    }, [])

    useEffect(() => {
        fetchVehicleData()
        return () => {
            // console.log('destroyed...');
            
        }
    }, [fetchVehicleData])

    useEffect(() => {
        dispatch(VehicleActions.onFetchVehicleSuccess({ name: 'Updated from COmp...' }))
    }, [dispatch])

    function paginatedListHandler(dataList) {
        // console.log(dataList);
        setPaginatedRecords(dataList)
    }

    let vehicleCardsWithPagination = vehicleInfo?.Results.length > 0 ? <div> {paginatedRecords.map((vehicle) => <VehicleCard key={vehicle.customId} vehicle={vehicle} />)}
            <Pagination dataList={vehicleInfo?.Results} paginatedListHandler={paginatedListHandler} incomingPageSize={9}/></div> : null

    return (
        <div>
            <h1>Hello</h1>
            {vehicleCardsWithPagination}

            <VehicleCounter />
           
        </div>
    )
}
