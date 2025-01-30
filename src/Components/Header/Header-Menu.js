import React, { useContext, use } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../Context/Cart-Context/Cart-Context';
import shoppingicon from '../../shopping-cart-dark.png';
import imageIcon from '../../image.png';
import classes from './Header_menu.module.css';
import { UserProfileContext } from '../../Context/userProfileContext';

export default function HeaderMenu() {
  console.log('Header...');
  const {noOfItems} = useContext(CartContext);

      const {userProfile} = use(UserProfileContext)
      console.log(userProfile);
      
  

  const navItems = [
    // { label: 'Home', navigationUrl: '/home' },
    { label: 'Vehicle', navigationUrl: '/vehicle' },
    // { label: 'Student', navigationUrl: '/student' },
    // { label: 'Store', navigationUrl: '/store' },
    // { label: 'Universities', navigationUrl: '/universities' },
    // { label: 'Game', navigationUrl: '/game' },
    // { label: 'Population', navigationUrl: '/population' },
    { label: 'Movies', navigationUrl: '/movies' },
    { label: 'Udemy', navigationUrl: '/udemy' },
    { label: 'University', navigationUrl: '/university' },
    { label: 'University Tanstrack', navigationUrl: '/university-tanstrack' }
  ]
  return (
    <header>
      <div className={classes.nav_container}>
        <nav className={classes.navbar}>
          <ul className={classes.menu}>
            {navItems.map((navItem) => <li key={navItem.navigationUrl} className={classes.menu_item}>
              <NavLink className={({ isActive }) => isActive ? classes.active : undefined} to={navItem.navigationUrl}>
                {/* <span className={classes.section_count}>1</span> */}
                {navItem.label}</NavLink>
            </li>
            )}
            <li className={`${classes.menu_item} ${classes.cart}`}>
                <Link>
                    <img src={shoppingicon} className={classes.cart_icon} alt='no url found' />
                    <span className={classes.cart_count}>{noOfItems}</span>
                </Link>
            </li>
            <li>{userProfile?.userName}</li>
            

            {/* <li className={`${classes.menu_item} ${classes.cart}`}>
                <Link>
                    <img src={imageIcon} className={classes.cart_icon} alt='no url found' />
                    <span className={classes.cart_count}>{noOfItems}</span>
                </Link>
            </li> */}

          </ul>
        </nav>
      </div>
    </header>
  )
}
