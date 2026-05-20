import React, { useContext } from 'react'
import { LotteryContext } from '../../Context/Lottery-Context/lottery-context';

export default function LotteryCart() {

    const { purchasedLotterys, clear } = useContext(LotteryContext);

    const tableHeaderProps = ['id', 'Label', 'Unit Price', 'Quantity', 'Total Price'];
    const tableHeaders = <tr key="table_headers">{tableHeaderProps.map((prop) => <th key={prop}>{prop}</th>)}</tr>

    const clearPurchase = () => {
        clear([]);
    }

    return (
        <div>
            {
                purchasedLotterys.length ?
                    <>
                        <button onClick={clearPurchase}>Clear</button>
                        <table>
                            <thead>
                                {tableHeaders}
                            </thead>
                            <tbody>
                                {purchasedLotterys.map((record) =>
                                    <tr key={record.id}>
                                        <td>{record.id}</td>
                                        <td>{record.label}</td>
                                        <td>{record.price}</td>
                                        <td>{record.quantity}</td>
                                        <td>{record.quantity * record.price}</td>
                                    </tr>)
                                }
                                <tr key="static_content">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total Quantity: {purchasedLotterys.reduce((prev, lot) => prev + lot.quantity, 0)}</td>
                                    <td>Total Price:{purchasedLotterys.reduce((prev, lot) => prev + (lot.quantity * lot.price), 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </> :
                    <p>No Lotterys in cart</p>
            }
        </div>
    )
}
