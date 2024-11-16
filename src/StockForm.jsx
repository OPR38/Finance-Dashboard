import React, { useState } from "react";
import "./stockForm.css";

const StockForm = ({ addStock }) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const validateAndSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!symbol || !quantity || !price) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=demo`
      );
      const data = await response.json();

      // Validate stock symbol
      if (data.bestMatches && data.bestMatches.length > 0) {
        const validSymbol = data.bestMatches[0]["1. symbol"];
        addStock({ symbol: validSymbol, quantity, price });
        setSymbol("");
        setQuantity("");
        setPrice("");
      } else {
        setError("Invalid stock symbol!");
      }
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError("Error validating stock symbol. Try again later.");
    }
  };

  return (
    <form onSubmit={validateAndSubmit} className="stock-form">
      {error && <p className="error">{error}</p>}
      <div className="form-row">
            <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Stock Symbol"
            />
            <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            />
            <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Purchase Price"
            />
            <button type="submit">Add Stock</button>
      </div>
    </form>
  );
};

export default StockForm;