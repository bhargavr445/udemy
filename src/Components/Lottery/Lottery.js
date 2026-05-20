import React, { useContext } from 'react'
import { LotteryContext } from '../../Context/Lottery-Context/lottery-context';

export default function Lottery({ lotteryType }) {

  const { label, price, id, qt } = lotteryType;

  const { buyNewLotteryFn } = useContext(LotteryContext);

  function buy() {
    buyNewLotteryFn(lotteryType);
  }

  return (
    <div className="lottery-card">
      <div className="lottery-card__content">
        <h3 className="lottery-card__title">{label}</h3>
        <p className="lottery-card__id">Game ID: {id}</p>
        <p className="lottery-card__price">Price: ${price}</p>
        <p className="lottery-card__price">Purchased: {qt}</p>
      </div>
      <button className="lottery-card__button" onClick={buy} >Buy</button>
    </div>
  )
}
