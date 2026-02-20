import { memo } from "react";

function Schedules({ updateNameFn }) {
  return (
    <div>
      <button onClick={updateNameFn}>Update Name</button>
    </div>
  )
}

export default memo(Schedules);
