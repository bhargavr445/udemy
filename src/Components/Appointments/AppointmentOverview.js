import React, { useCallback, useEffect, useState } from 'react'
import Schedules from './Schedules';

export default function AppointmentOverview() {

    const [userName, setUserName] = useState('Bhargav');
    const [pageNumber, setPageNumber] = useState(1);
    const [noOfRecordsPerPage, setNoOfRecordsPerPage] = useState(10);
    useEffect(() => {

      return () => {
      }
    }, []);

    useEffect(() => {
      // constructor api
    }, [pageNumber, noOfRecordsPerPage]);

    const updateName = useCallback(() => {
        setUserName('Bhargav R G');
    }, [])

    // function triggerApiCallTogetNewRecords() { 

    //   setPageNumber((prevPageNumber) => {
    //     return prevPageNumber+1
    //   });


    // }

    const triggerApiCallTogetNewRecords = useCallback(() => {

      setPageNumber((prevPageNumber) => {
        return prevPageNumber+1
      });
      
    }, [])

    function changenoOfp() {
      setPageNumber(1);
      setNoOfRecordsPerPage(15)
    }


    

  return (
    <>
        {userName}
        <Schedules updateNameFn={updateName}/>
    </>
  )
}
