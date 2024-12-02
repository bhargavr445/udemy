import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Pagination from '../../../../Commons/Components/Pagination';
import { fetchData } from '../../../../http/udemy';

export default function Purchase() {

  const [paginatedRecords, setPaginatedRecords] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ['purchasedCourses'],
    queryFn: fetchData
  });

  function paginatedListHandler(dataList) {
    setPaginatedRecords(dataList)
  }

  let contentWithData = '';
  if (isLoading) {
    contentWithData = 'Loading...........'
  } else {
    contentWithData = <table>
      <thead>
        <tr key="">
          <th>Category</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {paginatedRecords?.map((record) =>
          <tr key={record.course_id}>
            <td>
              {record?.categorys?.type}
            </td>
            <td>{record.title}</td>
            <td>$ {record.price}</td>
          </tr>)
        }
      </tbody>
    </table>
  }



  return (
    <div>
      {contentWithData}
      <div className='pagination_items '>
        {data?.data.length > 0 ? <Pagination dataList={data?.data} paginatedListHandler={paginatedListHandler} incomingPageSize={10} /> : ''}
      </div>

    </div>
  )
}
