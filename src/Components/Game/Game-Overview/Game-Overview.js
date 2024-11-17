import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import './Game-Overview.css';

import { lazy } from 'react';

const GameCard = lazy(() => import('../Game-Card/Game-Card.js'));
const GameCardSkeleton = lazy(() => import('../Game-Card-Skeleton/Game-Card-Skeleton.js'));


function GameOverview() {

    const [gamesList, setGamesList] = useState([]);
    const [gamesListApiError, setGamesListApiError] = useState(null);
    const [gamesListLoading, setGamesListLoading] = useState(false);

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

    const cardsSkeleton = <div className='cards-container'><GameCardSkeleton /></div>
    let apiResponseInErrorcenario = gamesListApiError ? <p>Something went wrong...</p> : <p>No Records Found</p>
    let gamesCardComponent = gamesListLoading ? cardsSkeleton : apiResponseInErrorcenario;
    if (gamesList.length > 0) {
        gamesCardComponent = <div className='cards-container'>{gamesList.map((game) => <GameCard key={game.id} game={game} />)}</div>
    }

    return (

        <Suspense fallback={<div>Loading...</div>}>
            {gamesCardComponent}
        </Suspense>
    )
}

export default GameOverview;
