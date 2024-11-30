import React, { useCallback, useEffect, useState } from 'react';
import AppConstants from '../Constants/App-Constants';

const Pagination = ({ dataList, paginatedListHandler, incomingPageSize }) => {

    const pageSize = incomingPageSize ?? AppConstants.pageSize;
    const buttonLabels = AppConstants.buttonLabels;

    const [paginatedList, setPaginatedList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [disableFirstPage, setDisableFirstPage] = useState(false);
    const [disableLastPage, setDisableLastPage] = useState(false);
    const [displayRecordsRange, setDisplayRecordsRange] = useState('');

    const originalNumber = dataList.length / pageSize;
    const roundedNumber = Math.ceil(originalNumber);

    const sendDataToTableComponent = useCallback(() => {
        paginatedListHandler(paginatedList);
    }, [paginatedListHandler, paginatedList])

    useEffect(() => {
        sendDataToTableComponent();
    }, [paginatedList, sendDataToTableComponent]);

    const checkIfDataListIsGraterThanRequiredSize = useCallback((lengthValueToCheck) => {
        return dataList.length > lengthValueToCheck;
    }, [dataList])

    const setPaginatedRecords = useCallback((beginningNumber, endingNumber) => {
        setPaginatedList(dataList.slice(beginningNumber, endingNumber));
    }, [dataList])

    const onFirstCLick = useCallback(() => {
        const endingNumber = checkIfDataListIsGraterThanRequiredSize(pageSize) ? pageSize : dataList.length;
        setPaginatedRecords(0, endingNumber);
        setDisplayRange(0, endingNumber);
        setPageNumber(1);
        endingNumber === dataList.length ? setDisableLastPage(true) : setDisableLastPage(false);
        setDisableFirstPage(true);
    }, [checkIfDataListIsGraterThanRequiredSize, dataList, setPaginatedRecords, pageSize]);

    useEffect(() => {
        onFirstCLick();
    }, [onFirstCLick]);

    const onPreviousCLick = () => {
        const beginningNumber = ((pageNumber - 1) * pageSize) - pageSize;
        const endingNumber = (pageNumber - 1) * pageSize
        setPaginatedRecords(beginningNumber, endingNumber);
        setDisplayRange(beginningNumber, endingNumber);
        setPageNumber((previousPage) => previousPage - 1);
        if (beginningNumber === 0) setDisableFirstPage(true)
        setDisableLastPage(false);
    }

    const onNextCLick = () => {
        const beginningNumber = (pageNumber * pageSize);
        const endingNumber = checkIfDataListIsGraterThanRequiredSize(beginningNumber + pageSize) ? (beginningNumber + pageSize) : dataList.length;
        setPaginatedRecords(beginningNumber, endingNumber);
        setDisplayRange(beginningNumber, endingNumber);
        setPageNumber((previousPage) => previousPage + 1);
        // endingNumber === dataList.length ? setDisableLastPage(true) : setDisableFirstPage(false);
        // Update the logic to setDisableLastPage correctly
        setDisableLastPage(!checkIfDataListIsGraterThanRequiredSize(beginningNumber + pageSize));
        setDisableFirstPage(false);
    }

    const onLastCLick = () => {
        const lastPageNumber = Math.ceil(dataList.length / pageSize);
        const beginningNumber = (lastPageNumber - 1) * pageSize;
        const endingNumber = dataList.length;
        setPaginatedRecords(beginningNumber, endingNumber);
        setDisplayRange(beginningNumber, endingNumber);
        setPageNumber(lastPageNumber);
        setDisableFirstPage(false);
        setDisableLastPage(true);
    }

    const setDisplayRange = (beginningNumber, endingNumber) => {
        setDisplayRecordsRange(`${beginningNumber + 1} - ${endingNumber}`);
    }

    return (
        <div>

            { dataList.length > 0 ? <div>
                <button id='firstButton' className="table-btn mat-h-20" disabled={disableFirstPage} onClick={() => { onFirstCLick() }}>{buttonLabels.first}</button>
                <button id='previousButton' className="table-btn mat-h-20" disabled={disableFirstPage} onClick={() => { onPreviousCLick() }}>{buttonLabels.previous}</button>
                <span className="paging-info">&nbsp;Displaying {displayRecordsRange} of {dataList.length} Records || Page {pageNumber} of {roundedNumber}</span>
                <button id='nextButton' className="table-btn mat-h-20" disabled={disableLastPage} onClick={() => { onNextCLick() }}>{buttonLabels.next}</button>
                <button id='lastButton' className="table-btn mat-h-20" disabled={disableLastPage} onClick={() => { onLastCLick() }}>{buttonLabels.last}</button>
            </div> : null}
        </div>
    )
}

export default Pagination;