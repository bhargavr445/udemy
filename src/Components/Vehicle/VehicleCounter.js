import { lazy } from 'react';
import React, { useCallback, useEffect, useState } from 'react'
import VehicleCounterChild from './VehicleCounterChild';
import axios from 'axios';
import SuspenseWrapper from '../../Routing-Config/Suspense-Wrapper';
// const VehicleCounterChild = lazy(() => import('./VehicleCounterChild'));



const refList  = [];

export default function VehicleCounter() {

    // console.log('Rendering...');

    const [name, setName] = useState('Bhargav');
    const [counter, setCounter] = useState(0);
    const [resp, setResp] = useState(null);

    const fetchData = async () => {

        try {
            const resp = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/ford?format=json123');
            setResp(resp);
        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     console.log(name.toUpperCase());
    // }, [name]);

    // const updateName = useCallback(function updateName() {
    //     setName('Bhargav R G');
    // }, []);

    function updateName() {
        setName('Bhargav R G');
    }

    function incrCounter() {
        setCounter((prevValue) => prevValue+1);
    }

    refList.push(updateName);

    if(refList.length > 1) {
        console.log(refList[0] === refList[1])
    }

    return (
        <div>
            {/* Hello Vehicle Counter -- {name}--{counter}
         <button onClick={updateName}>Update Name</button>
           

            <button onClick={incrCounter}>Counter</button>

            {counter ? <SuspenseWrapper><VehicleCounterChild/></SuspenseWrapper>  : null} */}

<VehicleCounterChild/>
        </div>
    )
 
}
