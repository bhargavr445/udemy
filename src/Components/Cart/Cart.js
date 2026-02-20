import React, { useContext } from 'react'
import { CartContext } from '../../Context/Cart-Context/Cart-Context'
import classes from './Cart.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const { cartItems, removeItemFromCart } = useContext(CartContext);
    const nav = useNavigate();

    function removeFromCart(item) {
        removeItemFromCart(item)
    }

    function navigateToVehicles() {
        nav('../vehicle');
    }

    return (
        <div className={classes.main}>
            {cartItems.length > 0 ?
                <div className={classes.container_body}>
                    <div className={classes.container}>
                        <div className={classes.shopping_cart}>
                            <div className={classes.header}>
                                <a onClick={navigateToVehicles} className={classes.back_link}>← Continue shopping</a>
                            </div>
                            <h2>Shopping cart</h2>
                            <p>You have {cartItems.length} items in your cart</p>

                            <div className={classes.cart_items}>
                                {cartItems.map((item) => (<div className={classes.cart_item}>

                                    <div className={classes.item_details}>
                                        <h3>{item.MakeName}</h3>
                                        <p>{item.VehicleTypeName}</p>
                                    </div>
                                    <div className={classes.item_price}>
                                        <span>{item.customId}</span>
                                    </div>
                                    <div className={classes.item_remove}>
                                        <button onClick={() => removeFromCart(item)}>🗑️</button>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    </div>
                </div> :
                <p>No items added to cart</p>
            }
        </div>
    )
}
