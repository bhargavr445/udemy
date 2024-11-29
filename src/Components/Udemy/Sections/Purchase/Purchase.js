import React from 'react'
import { useUdemyContext } from '../../../../Context/User-Info-Context/User-Info-Context'

export default function Purchase() {

  const data = useUdemyContext()
  console.log(data)

  return (
    <div>Purchase {data.name}</div>
  )
}
