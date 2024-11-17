import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { UdemyUserInfoContext } from './Context/User-Info-Context';
import classes from './Udemy-Overview.module.css';

export default function UdemyOverview() {
  const [userInfo, setUserInfo] = useState({ name: 'Bhargav', skillSet: 'Angular' });
  
  const udemyNavItems = [
    { label: 'Purchase', path: '/udemy/purchase', isActive: false },
    { label: 'Create Course', path: '/udemy/create', isActive: false }
  ]

  function updObj() {
    setUserInfo({name:'Bhargav R G', skillSet: 'React'});
  }

  return (
    <UdemyUserInfoContext.Provider value={userInfo}>
      <div className={classes.horizontal_menu}>

        <button onClick={updObj}>Update Obj {userInfo.name}</button>

        {udemyNavItems.map((item) =>
        (<NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => isActive ? classes.active_udemy_menu : undefined}>
          {item.label}
        </NavLink>))}
      </div>
      <Outlet />
    </UdemyUserInfoContext.Provider>
  )
}
