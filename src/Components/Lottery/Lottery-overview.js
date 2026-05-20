import React, { useContext, useMemo } from 'react'
import Lottery from './Lottery';
import { LotteryContext } from '../../Context/Lottery-Context/lottery-context';

const lotteryList = [
  { label: 'Pick 3', price: 1, id: 'p3' },
  { label: 'Pick 4', price: 2, id: 'p4' },
  { label: 'Pick 5', price: 3, id: 'p5' },
  { label: 'Mega Million', price: 4, id: 'M_M' },
  { label: 'Power Ball', price: 5, id: 'P_B' },
];

export default function LotteryOverview() {

  const { purchasedLotterys } = useContext(LotteryContext);

  const updatedLotteryList = useMemo(() => {
    const updatedLottery = lotteryList.map((staticLottery) => ({ ...staticLottery, qt: appQt(staticLottery, purchasedLotterys) }));
    return updatedLottery;
  }, [purchasedLotterys]);


  return (
    <>
      {updatedLotteryList.map((lottery) => <Lottery key={lottery.id} lotteryType={lottery} />)}
    </>
  )
}

function appQt(staticLottery, purchasedLotterys) {
  const matchingLottery = purchasedLotterys.find((lot) => lot.id === staticLottery.id);
  if (matchingLottery) {
    return matchingLottery.quantity;
  } else {
    return 0;
  }
}