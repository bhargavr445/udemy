import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderMenu from '../Header/Header-Menu'

export default function RootLayout() {
    return (
        <>
            <HeaderMenu />
            {/* <my-component /> */}
            <div className='main'>
                <Outlet />
            </div>
        </>
    )
}
