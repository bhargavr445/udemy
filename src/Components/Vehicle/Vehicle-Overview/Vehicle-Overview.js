import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import VehicleCard from '../Vehicle-Card/Vehicle-Card';
import { useDispatch, useSelector } from 'react-redux';
import { VehicleActions } from '../../../store/Vehicle.reducer';

export default function VehicleOverview() {

    const dispatch = useDispatch();

   const apiResp =  useSelector((state) => state.vehicle.vehicleApiResponse)
   console.log(apiResp);

    const [vehicleInfo, setVehicleInfo] = useState(null);

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
    }, [fetchVehicleData])

    useEffect(() => {
        dispatch(VehicleActions.onFetchVehicleSuccess({name: 'Updated from COmp...'}))
    }, [dispatch])

    return (
        <div>
            {vehicleInfo?.Results.map((vehicle) => <VehicleCard key={vehicle.customId} vehicle={vehicle} />)}
        </div>
    )
}
