import './App.css';
import { useEffect } from "react";

function App() {
  useEffect(()=> {
    console.log('Making API Request');
  },[]);

  return (
    <>
      <h1>Finance Dashboard</h1>
    </>
  )

}

export default App;
