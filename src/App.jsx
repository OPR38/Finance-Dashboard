import React, { useState } from "react";
import StockForm from "./StockForm";

const App = () => {
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  return (
    <div>
      <h1>Finance Dashboard</h1>
      <StockForm addStock={addStock} />
      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            {stock.symbol} - {stock.quantity} shares @ ${stock.price}/share
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;