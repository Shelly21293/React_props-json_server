import './App.css';
import { useState } from 'react';
import Cart from './Cart';
// import {getCars} from "./MyCars"


function App() {
  // let cars= getCars()
  const [myCars, setmyCars] = useState([])
  const [model, setmodel] = useState([])
  const [year, setyear] = useState(0)
  const [color, setcolor] = useState([])
  const [myCart, setmyCart] = useState([])
  const SERVER="http://localhost:3007/cars"
  



  const getDataFromServer = async () => {
   setmyCars(await fetch(SERVER).
        then(response => response.json()))
}


const addData2Server = () => {
  const data =  {
      "model":model,
      "year":year,
      "color":color,
      "img":"p1.jpg",
  };
  console.log( JSON.stringify(data))
  fetch(SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });

}

const addCar = (ind) => {
  setmyCart([...myCart, myCars[ind]])
}



const deleteCar = (id) => {
  console.log(id)
  setmyCart(myCart.filter(car => car.id !== id))


}

  return (
    <div>
      <hr></hr>
      <button onClick={() => addData2Server()}>add data</button>
      Model:<input value={model} onChange={(e) => setmodel(e.target.value)} />
      Year:<input value={year} onChange={(e) => setyear(e.target.value)} />
      Color:<input value={color} onChange={(e) => setcolor(e.target.value)} />     
      <hr></hr>

      <button onClick={() => getDataFromServer()}>Get data</button>
      <div style={{ display: "inline" }}>
      {myCars.map((car, ind) =>
          <div key={ind}> {car.model}{" "}{car.year}{" "}{car.color}
              <button onClick={() => addCar(ind)}>Buy</button>
          </div>)}
      </div>
      <hr></hr>

      <Cart cartList={myCart} delCar={deleteCar}></Cart>

    </div>
  );
}

export default App;
