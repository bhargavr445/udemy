import { memo, useEffect } from "react";

function Schedules({ userName }) {

  useEffect(() => {
  
      console.log('Running...');
      
    }, []);

  return (
    <div>
      child comp-{userName}
    </div>
  )
}

export default memo(Schedules);
