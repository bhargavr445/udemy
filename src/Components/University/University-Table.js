import React, { memo } from 'react';
import { useUniversityContext } from '../../Context/university/UniversityContext';

const tableHeaderProps = ['Actions', 'Name', 'Country'];

function UniversityTable({ list }) {

  const { selectedUniversities, addOrRemoveUniversityToCart } = useUniversityContext();
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
                <input
                  checked={!!selectedUniversities.find((univ) =>
                    univ.domains.lenght === record.domains.lenght && univ.domains[0] === record.domains[0])}
                  type='checkbox'
                  onChange={() => addOrRemoveUniversityToCart(record)} />
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

export default memo(UniversityTable);