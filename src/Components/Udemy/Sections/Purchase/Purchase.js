import React, { useState } from 'react'
import { useUdemyContext } from '../../../../Context/User-Info-Context/User-Info-Context'
import CourseCard from '../course-card/CourseCard'

export default function Purchase() {

  const [itemNumber, setItemNumber] = useState(0)

  const data = useUdemyContext()
  console.log(data)

  const addToCart = (e) => {
    setItemNumber((prevValue) => prevValue + 1);
  }

  return (
    <div>
      <CourseCard clickHandler={addToCart} />
      Purchase {data.name}-{itemNumber}
    </div>
  )
}
