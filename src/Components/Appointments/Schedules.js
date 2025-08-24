import React, { memo } from 'react'

 function Schedules({updateNameFn}) {
    console.log('Re-exec...');
    
  return (
    <div>
        <button onClick={updateNameFn}>Update Name</button>
        </div>
  )
}

export default memo(Schedules);

// const stu = {name: 10, id: 11};
// stu.name 
// const {name: stName, id} = stu;
