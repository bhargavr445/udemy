import React, { lazy, Suspense, useState } from 'react';
import Pagination from '../../../Commons/Components/Pagination.js';
import useFetch from '../../../hooks/useFetch.js';
import './Game-Overview.css';
import CustomSelect from '../../../Commons/Components/CustomSelect.js';
import GameCounter from '../GameCounter.js';
const GameCard = lazy(() => import('../Game-Card/Game-Card.js'));
const GameCardSkeleton = lazy(() => import('../Game-Card-Skeleton/Game-Card-Skeleton.js'));


function GameOverview() {

    const optionsList = [
        {gameType: 'PC', gameCode: 'pc'},
        {gameType: 'xbox', gameCode: 'xb'},
        {gameType: 'PS', gameCode: 'ps'},
        {gameType: 'Mobile', gameCode: 'mb'},
        {gameType: 'Tab', gameCode: 'tb'},
    ]

    const [paginatedRecords, setPaginatedRecords] = useState([]);

    const {
        apiResponse: countrysListApiResponse,
        apiError: countrysListApiErrorResponse,
        apiLoading: countrysListApiLoading
      } = useFetch('http://localhost:3010/api/games');
      

    function paginatedListHandler(dataList) {
        setPaginatedRecords(dataList)
    }

    function onOptionSelection(data) {
        console.log(data);
    }

    const cardsSkeleton = <div className='cards-container'><GameCardSkeleton /></div>
    let apiResponseInErrorcenario = countrysListApiErrorResponse ? <p>Something went wrong...</p> : <p>No Records Found</p>
    let gamesCardComponent = countrysListApiLoading ? cardsSkeleton : apiResponseInErrorcenario;
    if (countrysListApiResponse?.data?.data?.length > 0) {
        gamesCardComponent = <div className='cards-container'>
            {paginatedRecords.map((game) => <GameCard key={game.id} game={game} />)}
            <Pagination dataList={countrysListApiResponse?.data?.data} paginatedListHandler={paginatedListHandler} incomingPageSize={6} />
        </div>
    }

    return (
        <>
       < GameCounter />
        <CustomSelect optionsList={optionsList} displayProp={'gameType'} onOptionSelection={onOptionSelection}/>
        <Suspense fallback={<div>Loading...</div>}>
            {gamesCardComponent}
        </Suspense>
        </>
    )
}

export default GameOverview;
