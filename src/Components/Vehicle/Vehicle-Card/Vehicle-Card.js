import React, { useContext } from 'react';
import { CartContext } from '../../../Context/Cart-Context/Cart-Context';
import classes from './Vehicle-Card.module.css';

export default function VehicleCard({ vehicle: { MakeId, MakeName, VehicleTypeId, VehicleTypeName, customId } }) {

    const { cartItems, addItemToCartInContext } = useContext(CartContext);

    const elementExists = cartItems.find(item => item.customId === customId)

    function addItemsToCart() {
        addItemToCartInContext({ MakeId, MakeName, VehicleTypeId, VehicleTypeName, customId })
    }

    return (
        <div className={classes.card}>
            <input type="text" />
            <div className={classes.card_content}>
                <h2 className={classes.card_title}>{MakeName}</h2>
                <p className={classes.card_author}>{VehicleTypeName}</p>
                <p className={classes.progress_text}>{customId}</p>
            </div>
            <div className={classes.button_section}>
                {elementExists ? null : <button onClick={addItemsToCart}>Add to Cart</button>}
            </div>
        </div>
    )
}
