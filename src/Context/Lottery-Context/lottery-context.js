import { createContext, useState } from "react";

export const LotteryContext = createContext([]);

export const LotteryContextProvider = ({ children }) => {

    const [purchasedLotterys, setPurchasedLotterys] = useState([]);

    function buyNewLotteryFn(lottery) {

        if (checkIfLotteryExists(lottery, purchasedLotterys)) {
            const updatedWithQuantity = purchasedLotterys.map(pLottery => ({ ...pLottery, quantity: pLottery.id === lottery.id ? pLottery.quantity + 1 : pLottery.quantity }))
            setPurchasedLotterys(updatedWithQuantity);
        } else {
            setPurchasedLotterys((pL) => [...pL, { ...lottery, quantity: 1 }]);
        }
    }

    function clear() {
        setPurchasedLotterys([]);
    }

    return <LotteryContext.Provider value={{ purchasedLotterys, buyNewLotteryFn, clear }}>{children}</LotteryContext.Provider>
}

function checkIfLotteryExists(lottery, previousLotterys) {
    const exists = previousLotterys.find(pL => pL.id === lottery.id);
    return !!exists;
}