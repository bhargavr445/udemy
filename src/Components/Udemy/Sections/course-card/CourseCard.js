import React from 'react';

function CourseCard({clickHandler}) {
    console.log('Rerendered...')

  return (
    <div>
        <button className="table-btn mat-h-20" onClick={(e) => clickHandler(e)}>Click</button>
    </div>
  )
}

export default CourseCard;