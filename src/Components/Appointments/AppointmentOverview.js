import React, { useCallback, useEffect, useState } from 'react'
import Schedules from './Schedules';

export default function AppointmentOverview() {

  const [userName, setUserName] = useState('Bhargav');

  useEffect(() => {

    return () => {
    }
  }, []);

  const updateName = useCallback(() => {
    setUserName(`Bhargav R G ${Math.random()}`);
  }, [])


  return (
    <>
      {userName}
      <button onClick={updateName}>Update Name</button>
      <Schedules userName={userName} />
    </>
  )
}
