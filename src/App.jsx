import './App.css';
import { useEffect } from "react";

// mine own ex 5
// function handleHover(){
//   alert('Just click!!');
// }


function App() {

  // ex 5
  // function handleClick(){
  //   alert('Clicked!!');
  // }

  //ex 6
  // function handleChange(){
  //    alert('New option selected')
  // }

  //eg of Hook
  //first is function, second is array
  //()=> {} this is arrow function
  useEffect(()=> {
    console.log('Making API Request');
  },[]);

  return (
    <>
      <h1>Currency Converter</h1>
      {/* <button onMouseOver={handleHover}>
        Click me
      </button> */}
      {/* <select name="currency" id="currencySelect" onChange={handleChange}>
      <option value="usd">USD</option>
      <option value="jpy">JPY</option>
      <option value="sgd">SGD</option>
      <option value="myr">MYR</option>
      </select> */}
      {/* <button onClick={handleClick}>
        Click me
      </button> */}
    </>
  )

}

export default App;
