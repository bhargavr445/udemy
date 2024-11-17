import React from 'react';
import HeaderMenu from '../Header/Header-Menu';

function RouteError() {
    return (
        <>
            <HeaderMenu />
            <div className='main'>
                <p>Route Doesnt Exists</p>
            </div>
        </>
    )
}

export default RouteError;