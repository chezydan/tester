import React ,{useContext} from 'react'
import { FirstContext } from './Parent'

function Product() {
  const mycolor =useContext(FirstContext)
  return (
    <div>
      <h3>product</h3>
    <p>{mycolor}</p>
    <p>{mycolor}</p>
      <p>after</p>

    </div>


  )
}

export default Product