import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Pagination from '../../Commons/Components/Pagination';
import { fetchCountrys, fetchUniversities } from '../../http/University';
import UniversityTanstrackTable from './universityTanstrackTable';

function UniversityTanstrack() {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [paginatedRecords, setPaginatedRecords] = useState([]);

  const {
    data: countrysListApiResponse,
    apiLoading: countrysListApiLoading
  } = useQuery({
    queryKey: ['countrys'],
    queryFn: fetchCountrys,
    staleTime: Infinity,
  })

  const {
    data,
    isLoading,
    //  isError,
    //  error
  } = useQuery({
    queryKey: ['universityList', { selectedCountry: selectedCountry }],
    queryFn: ({ signal }) => fetchUniversities({ selectedCountry, signal }),
    enabled: !!selectedCountry
  });

  const countrySelectionChangehandler = (e) => {
    setSelectedCountry(e);
  }

  const paginatedListHandler = (dataList) => {
    setPaginatedRecords(dataList)
  }

  let countSection = isLoading || <p>{data?.data?.length} Records Found</p>;
  let universityListComp = isLoading ? 'Table Data Loading...' : '';
  if (!isLoading && data) {
    universityListComp = <div>
      <UniversityTanstrackTable list={paginatedRecords} />
      <div className='pagination_items '>
        <Pagination dataList={data.data} paginatedListHandler={paginatedListHandler} incomingPageSize={10} />
      </div>
    </div>
  }

  let countrysListSelectDropdown = 'Loading...';
  if (!countrysListApiLoading && countrysListApiResponse) {
    countrysListSelectDropdown = <select onChange={(e) => countrySelectionChangehandler(e.target.value)}>
      <option value="" key="initial_value">Select Option</option>
      {countrysListApiResponse?.data.map((country) => <option value={country.code} key={country.name}>{country.name}</option>)}
    </select>
  }

  return (
    <div>
      {countrysListSelectDropdown}
      {countSection}
      {universityListComp}
    </div>
  )
}

export default UniversityTanstrack;
