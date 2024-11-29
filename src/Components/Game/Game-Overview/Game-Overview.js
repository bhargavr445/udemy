import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import './Game-Overview.css';

import { lazy } from 'react';
import Pagination from '../../../Commons/Components/Pagination.js';

const GameCard = lazy(() => import('../Game-Card/Game-Card.js'));
const GameCardSkeleton = lazy(() => import('../Game-Card-Skeleton/Game-Card-Skeleton.js'));


function GameOverview() {

    const [gamesList, setGamesList] = useState([]);
    const [gamesListApiError, setGamesListApiError] = useState(null);
    const [gamesListLoading, setGamesListLoading] = useState(false);
    const [paginatedRecords, setPaginatedRecords] = useState([]);


    useEffect(() => {
        fetchData()
    }, []);

    async function fetchData() {
        setGamesListLoading(true);
        try {
            const gamesList = await axios.get('http://localhost:3010/api/games');
            setGamesList(gamesList.data.data);
            setGamesListLoading(false);
            setGamesListApiError(null);
        }
        catch (error) {
            setGamesListApiError(error);
            setGamesListLoading(false)
        }
    }

    function paginatedListHandler(dataList) {
        setPaginatedRecords(dataList)
    }


    const cardsSkeleton = <div className='cards-container'><GameCardSkeleton /></div>
    let apiResponseInErrorcenario = gamesListApiError ? <p>Something went wrong...</p> : <p>No Records Found</p>
    let gamesCardComponent = gamesListLoading ? cardsSkeleton : apiResponseInErrorcenario;
    if (gamesList.length > 0) {
        gamesCardComponent = <div className='cards-container'>
            {paginatedRecords.map((game) => <GameCard key={game.id} game={game} />)}
            <Pagination dataList={gamesList} paginatedListHandler={paginatedListHandler} incomingPageSize={6} />
        </div>
    }

    return (

        <Suspense fallback={<div>Loading...</div>}>
            {gamesCardComponent}
        </Suspense>
    )
}

export default GameOverview;
