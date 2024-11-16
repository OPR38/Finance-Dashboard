// import React, { useState, useEffect } from 'react';
// import './stockList.css';

// const StockList = ({ stocks }) => {
//   const [currentPrices, setCurrentPrices] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // API key and base URL for Alpha Vantage
//   const apiKey = '1d75347365e81372a68effe4';
//   const baseUrl = 'https://www.alphavantage.co/query';

//   useEffect(() => {
//     const fetchStockPrices = async () => {
//       setLoading(true);
//       setError('');
      
//       // Fetch current prices for each stock in the list
//       const prices = {};

//       for (const stock of stocks) {
//         try {
//           const response = await fetch(
//             `${baseUrl}?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`
//           );
//           const data = await response.json();

//           // Check if the data is valid and contains a "Global Quote"
//           if (data['Global Quote']) {
//             const currentPrice = parseFloat(data['Global Quote']['05. price']);
//             prices[stock.symbol] = currentPrice;
//           } else {
//             setError('Failed to fetch stock prices.');
//           }
//         } catch (err) {
//           setError('Error fetching stock prices. Try again later.');
//           console.error('Error fetching stock data:', err);
//         }
//       }

//       setCurrentPrices(prices);
//       setLoading(false);
//     };

//     if (stocks.length > 0) {
//       fetchStockPrices();
//     }
//   }, [stocks]);  // Runs when the stocks array changes

//   if (loading) {
//     return <p>Loading stock prices...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (stocks.length === 0) {
//     return <p>No stock added yet.</p>;
//   }

//   return (
//     <div>
//       {stocks.map((stock, index) => {
//         const currentPrice = currentPrices[stock.symbol] || 0;
//         const profitLoss = (currentPrice - stock.price) * stock.quantity;
//         const profitLossText = profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);
//         const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss';

//         return (
//           <div key={index} className="stock-item">
//             <p><strong>Symbol:</strong> {stock.symbol}</p>
//             <p><strong>Quantity:</strong> {stock.quantity}</p>
//             <p><strong>Purchase Price:</strong> ${stock.price.toFixed(2)}</p>
//             <p><strong>Current Price:</strong> ${currentPrice.toFixed(2)}</p>
//             <p><strong>Profit/Loss:</strong> <span className={profitLossClass}>{profitLossText}</span></p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StockList;


// import React, { useEffect, useState } from 'react';
// import { useStock } from './StockContext';
// import './stockList.css';

// const StockList = () => {
//   const { stocks, loading, error } = useStock();
//   const [isStockAvailable, setIsStockAvailable] = useState(false);

//   useEffect(() => {
//     if (stocks.length > 0) {
//       setIsStockAvailable(true);
//     }
//   }, [stocks]);

//   if (!isStockAvailable) {
//     return <p>No stock added yet.</p>;
//   }

//   if (loading) {
//     return <p>Loading stock prices...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       {stocks.map((stock, index) => {
//         const currentPrice = stock.currentPrice || 0;
//         const profitLoss = (currentPrice - stock.price) * stock.quantity;
//         const profitLossText = profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);
//         const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss';

//         return (
//           <div key={index} className="stock-item">
//             <p><strong>Symbol:</strong> {stock.symbol}</p>
//             <p><strong>Quantity:</strong> {stock.quantity}</p>
//             <p><strong>Purchase Price:</strong> ${stock.price.toFixed(2)}</p>
//             <p><strong>Current Price:</strong> ${currentPrice.toFixed(2)}</p>
//             <p><strong>Profit/Loss:</strong> <span className={profitLossClass}>{profitLossText}</span></p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StockList;

// import React from 'react';
// import './stockList.css'; 

// const StockList = ({ stocks }) => {
//   const currentPrice = 204.99; 

//   return (
//     <div className="stock-list">
//       {stocks.map((stock, index) => {
//         const profitLoss = (currentPrice - Number(stock.price)) * stock.quantity;
//         const profitLossText = profitLoss >= 0 ? `+${profitLoss.toFixed(2)}` : profitLoss.toFixed(2);
//         const profitLossClass = profitLoss >= 0 ? 'profit' : 'loss';

//         return (
//           <div key={index} className="stock-item">
//             <p><strong>Symbol:</strong> {stock.symbol}</p>
//             <p><strong>Quantity:</strong> {stock.quantity}</p>
//             <p><strong>Purchase Price:</strong> ${Number(stock.price).toFixed(2)}</p>
//             <p><strong>Current Price:</strong> ${Number(currentPrice).toFixed(2)}</p>
//             <p><strong>Profit/Loss:</strong> <span className={profitLossClass}>{profitLossText}</span></p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StockList;

import React, { useEffect, useState } from 'react';
import './stockList.css';

const StockList = ({ stocks }) => {
  const [stockPrices, setStockPrices] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  const fetchStockPrice = async (symbol) => {
    // try {
    //   const response = await fetch(
    //     `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=1d75347365e81372a68effe`
    //   );
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=0LJLM45N47PJRYRU`
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