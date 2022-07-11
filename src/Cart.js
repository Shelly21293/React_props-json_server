import React from 'react'

const Cart = (props) => {
  return (
    <div>
        
        {props.cartList.map((car, ind) =>
          <div key={ind}> {car.model}{" "}{car.year}{" "}{car.color}
              <button onClick={() => props.delCar(car.id)}>Delete</button>
          </div>)}




    </div>
  )
}

export default Cart