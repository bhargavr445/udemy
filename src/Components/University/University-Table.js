import React, { memo } from 'react'

function UniversityTable({ list }) {
  console.log(list);

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {list.map((record) => <tr>
            <td>{record.name}</td>
            <td>{record.country}</td>
          </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default memo(UniversityTable);

