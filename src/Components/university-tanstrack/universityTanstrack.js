import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Commons/Components/Pagination';
import { fetchCountrys, fetchUniversities } from '../../http/University';
import UniversityTanstrackTable from './universityTanstrackTable';
import CustomSelect from '../../Commons/Components/CustomSelect';

function UniversityTanstrack() {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [paginatedRecords, setPaginatedRecords] = useState([]);

  // fetching countrys
  const {
    data: countrysListApiResponse,
    apiLoading: countrysListApiLoading
  } = useQuery({
    queryKey: ['countrys'],
    queryFn: fetchCountrys,
    staleTime: Infinity,
  });

  // fetching universities based on country name selection
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

  useEffect(() => {
    console.log('setting default country', countrysListApiResponse);
    setSelectedCountry(countrysListApiResponse?.data && countrysListApiResponse?.data[0].code)
  }, [countrysListApiResponse])

  const countrySelectionChangehandler = (e) => {
    setSelectedCountry(e);
  };

  function onOptionSelection(selectedOption) {
    console.log(selectedOption);
    setSelectedCountry(selectedOption['code']);
  }

  const paginatedListHandler = (dataList) => {
    setPaginatedRecords(dataList);
  };

  let countSection = isLoading || <p>{data?.data?.length} Records Found</p>;
  let universityListComp = isLoading ? 'Table Data Loading...' : '';
  if (!isLoading && data) {
    universityListComp =
      (<div>
        <UniversityTanstrackTable list={paginatedRecords} />
        <div className='pagination_items '>
          <Pagination dataList={data.data} paginatedListHandler={paginatedListHandler} incomingPageSize={10} />
        </div>
      </div>)
  };

  let countrysListSelectDropdown = 'Loading...';
  if (!countrysListApiLoading && countrysListApiResponse) {
    countrysListSelectDropdown =(
    <div className='dropdown_container'>
        <div className='custom_dropdown'>
          {/* <select className='custom_select' value={selectedCountry}  onChange={(e) => countrySelectionChangehandler(e.target.value)}>
            <option value="" key="initial_value">Select Option</option>
            {countrysListApiResponse?.data.map((country) => <option value={country.code} key={country.name}>{country.name}</option>)}
          </select> */}
          <CustomSelect optionsList ={countrysListApiResponse?.data} displayProp={'name'} onOptionSelection={onOptionSelection}/>
        </div>
      </div>)
  };

  return (
    <div>
      {countrysListSelectDropdown}
      {countSection}
      {universityListComp}
    </div>
  );
};

export default UniversityTanstrack;
