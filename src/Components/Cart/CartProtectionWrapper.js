import React, { useContext } from 'react'
import { CartContext } from '../../Context/Cart-Context/Cart-Context';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CartProtectionWrapper({children}) {
    const location = useLocation();
    const nav = useNavigate();
    let comp = null;
    const { noOfItems } = useContext(CartContext);

        if(noOfItems > 0) {
            comp = children
        } else {
            // nav('movies')
            window.history.replaceState(null, "", location.pathname);
            return <></>
        }
    
  return (
    <>{comp}</>
  )
}
