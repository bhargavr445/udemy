import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import UniversityTable from './University-Table';
import Pagination from '../../Commons/Components/Pagination';

const props = ['country', 'name'];

function UniversityOverview() {

    const [universityList, setUniversityList] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [paginatedRecords, setPaginatedRecords] = useState([]);

    const filterRecords = (list, filterText) => {
        const filteredRecordsList = list.filter((record) => props.some((prop) => record[prop].toLowerCase().includes(filterText.toLowerCase())));
        setFilteredRecords(filteredRecordsList)
    }

    useEffect(() => {
        filterRecords(universityList, filterText);
    }, [universityList, filterText]);

    const fetchUniversities = useCallback(async () => {
        setApiLoading(true);
        const response = await axios.get('http://universities.hipolabs.com/search');
        if (response.status !== 200) {
            setApiLoading(false);
            throw new Error('Api call Failed...');
        }
        setUniversityList(response.data);
        setApiLoading(false);
    }, []);

    useEffect(() => {
        fetchUniversities()
    }, [fetchUniversities]);

    let universityCardComp = apiLoading ? 'Loading...' : '';
    let countSection = apiLoading || <p>{filteredRecords?.length} Records Found</p>;
    if (paginatedRecords.length > 0) {
        universityCardComp = <UniversityTable list={paginatedRecords} />;
    }

    const paginatedListHandler = (dataList) => {
        setPaginatedRecords(dataList)
    }

    return (
        <div>
            <input type="text" placeholder='Filter Records' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            <button id='lastButton' className="table-btn mat-h-20" onClick={() => { fetchUniversities() }}>Refresh</button>
            {countSection}
            {universityCardComp}
            <div className='pagination_items '>
            <Pagination dataList={filteredRecords} paginatedListHandler={paginatedListHandler} incomingPageSize={10} />
            </div>
        </div>
    )
}

export default UniversityOverview;