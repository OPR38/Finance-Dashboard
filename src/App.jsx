import React, { useState } from "react";
import StockForm from "./StockForm";
import StockList from "./StockList";
import "./App.css";

const App = () => {
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <StockForm addStock={addStock} />
      <h2>Stock List</h2>
      <div className="stock-list-container">
      {stocks.length > 0 ? (
        <StockList stocks={stocks} />
      ) : (
        <p>No stock added yet.</p>
      )}
      </div>
    </div>
  );
};

export default App;