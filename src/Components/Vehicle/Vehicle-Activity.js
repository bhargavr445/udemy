import React, { useEffect } from 'react';

export default function VehicleActivity() {

  useEffect(() => {
    console.log('Mounted');
    return () => {
      console.log('destroyed');
    }
  }, []);
  
  return (
    <div>Vehicle-Activity</div>
  )
}
