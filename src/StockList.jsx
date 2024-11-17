import React, { useEffect, useState } from 'react';
import './stockList.css';

const StockList = ({ stocks }) => {
  const [stockPrices, setStockPrices] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  const fetchStockPrice = async (symbol) => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=TQ918BCXJSKR5297`
        );
      const data = await response.json();

      if (data['Global Quote'] && data['Global Quote']['05. price']) {
        const price = parseFloat(data['Global Quote']['05. price']);
        setStockPrices((prevPrices) => ({
          ...prevPrices,
          [symbol]: price,
        }));
      } else {
        setError(`Failed to fetch price for ${symbol}`);
      }
    } catch (err) {
      setError('Error fetching stock price');
      console.error('Error fetching stock data:', err);
    }
  };


  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true); 
      for (let stock of stocks) {
        await fetchStockPrice(stock.symbol);
      }
      setLoading(false); 
    };

    fetchPrices();
  }, [stocks]); 

  return (
    <div className="stock-list">
      {loading && <p>Loading stock prices...</p>}
      {error && <p className="error">{error}</p>}
      {stocks.length === 0 && !loading && <p>No stock added yet.</p>}

      {stocks.map((stock, index) => {
        const currentPrice = stockPrices[stock.symbol] || 0; 
        const profitLoss = (currentPrice - Number(stock.price)) * stock.quantity;
        const profitLossText = profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);
        const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss';

        return (
          <div key={index} className="stock-item">
            <p><strong>Symbol:</strong> {stock.symbol}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Purchase Price:</strong> ${Number(stock.price).toFixed(2)}</p>
            <p><strong>Current Price:</strong> ${currentPrice ? currentPrice.toFixed(2) : 'Loading...'}</p>
            <p><strong>Profit/Loss:</strong> <span className={profitLossClass}>{profitLossText}</span></p>
          </div>
        );
      })}
    </div>
  );
};

export default StockList;