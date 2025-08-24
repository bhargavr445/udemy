import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../Commons/Components/Pagination';
import { useUniversityContext } from '../../Context/university/UniversityContext';
// import useFetch from '../../hooks/useFetch';
import { fetchUniversities } from '../../http/University';
import { fetchUniversityData } from './store/UniversityStore';
import UniversityTable from './University-Table';
import { useDebounce } from '../../hooks/useDebounce';

const props = ['country', 'name'];

function UniversityOverview() {

    const queryData = useQuery({
        queryKey: ['universityList'],
        queryFn: fetchUniversities
    });
    // console.log(queryData);


    // const { apiResponse } = useFetch('http://localhost:3010/api/countrys');
    // console.log(apiResponse);
    const { selectedUniversities } = useUniversityContext();
    const [filterText, setFilterText] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [paginatedRecords, setPaginatedRecords] = useState([]);
    const dispatch = useDispatch();
    const universityList = useSelector((state) => state.university.universityApiResponse);
    const apiLoading = useSelector((state) => state.university.universityApiLoading);

    const debouncedText = useDebounce(filterText, 1000);


    useEffect(() => {
        dispatch(fetchUniversityData());
    }, [dispatch]);

    const filterRecords = (list, filterText) => {
        const filteredRecordsList = list.filter((record) => props.some((prop) => record[prop].toLowerCase().includes(filterText.toLowerCase())));
        setFilteredRecords(filteredRecordsList)
    }

    useEffect(() => {        
        filterRecords(universityList, debouncedText);
    }, [universityList, debouncedText]);

    let universityCardComp = apiLoading ? 'Loading...' : '';
    let countSection = apiLoading || <p>{filteredRecords?.length} Records Found</p>;
    if (paginatedRecords.length > 0) {
        universityCardComp = <UniversityTable key='university_table' list={paginatedRecords} />;
    }

    const paginatedListHandler = (dataList) => {
        setPaginatedRecords(dataList)
    }

    return (
        <div>
            <input type="text" placeholder='Filter Records' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            <button id='lastButton' className="table-btn mat-h-20">Refresh-{selectedUniversities.length}</button>
            {countSection}
            {universityCardComp}
            <div className='pagination_items '>
                <Pagination dataList={filteredRecords} paginatedListHandler={paginatedListHandler} incomingPageSize={10} />
            </div>
        </div>
    )
}

export default UniversityOverview;