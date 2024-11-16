import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const StockContext = createContext();

export const useStock = () => useContext(StockContext);

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const apiKey = '1d75347365e81372a68effe4';
  // const apiKey = 'demo'; 
  const apiKey = '0LJLM45N47PJRYRU';
  const baseUrl = 'https://www.alphavantage.co/query';

  const fetchStockPrice = useCallback(async (symbol) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${baseUrl}?function=GLOBAL_QUOTE&symbol=IBM&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data['Global Quote']) {
        return parseFloat(data['Global Quote']['05. price']);
      } else {
        setError('Failed to fetch stock price');
        return null;
      }
    } catch (err) {
      setError('Error fetching stock price');
      console.error('Error fetching stock data:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const addStock = (newStock) => {
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  useEffect(() => {
    if (stocks.length > 0) {
      const fetchPrices = async () => {
        for (let stock of stocks) {
          const price = await fetchStockPrice(stock.symbol);
          if (price) {
            stock.currentPrice = price;
          }
        }
      };

      fetchPrices();
    }
  }, [stocks, fetchStockPrice]);

  return (
    <StockContext.Provider value={{ stocks, addStock, loading, error }}>
      {children}
    </StockContext.Provider>
  );
};
