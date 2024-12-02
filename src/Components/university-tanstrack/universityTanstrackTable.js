import React from 'react';

const tableHeaderProps = ['Actions', 'Name', 'Country'];

function UniversityTanstrackTable({ list }) {

  let tableHeaders = <tr key="table_headers">{tableHeaderProps.map((prop) => <th key={prop}>{prop}</th>)}</tr>

  return (
    <div>
      <table>
        <thead>
          {tableHeaders}
        </thead>
        <tbody>
          {list.map((record) =>
            <tr key={record.domains[0]}>
              <td>
                
              </td>
              <td>{record.name}</td>
              <td>{record.country}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default UniversityTanstrackTable

