// import React, { useState } from "react";
// import { useStock } from "./StockContext";
// import "./stockForm.css";

// const StockForm = ({ addStock }) => {
//   const [symbol, setSymbol] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [error, setError] = useState("");

//   const validateAndSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!symbol || !quantity || !price) {
//       setError("All fields are required!");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=1d75347365e81372a68effe4`
//       );
//       const data = await response.json();

//       // Validate stock symbol
//       if (data.bestMatches && data.bestMatches.length > 0) {
//         const validSymbol = data.bestMatches[0]["1. symbol"];
//         addStock({ symbol: validSymbol, quantity, price });
//         setSymbol("");
//         setQuantity("");
//         setPrice("");
//       } else {
//         setError("Invalid stock symbol!");
//       }
//     } catch (err) {
//       console.error("Error fetching stock data:", err);
//       setError("Error validating stock symbol. Try again later.");
//     }
//   };

//   return (
//     <form onSubmit={validateAndSubmit} className="stock-form">
//       {error && <p className="error">{error}</p>}
//       <div className="form-row">
//             <input
//             type="text"
//             value={symbol}
//             onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//             placeholder="Stock Symbol"
//             />
//             <input
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             placeholder="Quantity"
//             />
//             <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder="Purchase Price"
//             />
//             <button type="submit">Add Stock</button>
//       </div>
//     </form>
//   );
// };

// export default StockForm;

// import React, { useState } from "react";
// import { useStock } from "./StockContext";
// import "./stockForm.css";

// const StockForm = ({}) => {
//   const { addStock } = useStock();
//   const [symbol, setSymbol] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [error, setError] = useState("");

//   const validateAndSubmit = (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!symbol || !quantity || !price) {
//       setError("All fields are required!");
//       return;
//     }

//     addStock({ symbol, quantity, price });
//     setSymbol("");
//     setQuantity("");
//     setPrice("");
//   };

//   return (
//     <form onSubmit={validateAndSubmit} className="stock-form">
//       {error && <p className="error">{error}</p>}
//       <div className="form-row">
//         <input
//           type="text"
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value.toUpperCase())}
//           placeholder="Stock Symbol"
//         />
//         <input
//           type="number"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           placeholder="Quantity"
//         />
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Purchase Price"
//         />
//         <button type="submit">Add Stock</button>
//       </div>
//     </form>
//   );
// };

// export default StockForm;

import React, { useState } from "react";
import "./stockForm.css";

const StockForm = ({ addStock }) => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const validateAndSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    if (!symbol || !quantity || !price) {
      setError("All fields are required!");
      setLoading(false); 
      return;
    }

    try {
        // const response = await fetch(
        //     `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=1d75347365e81372a68effe`
        //   );
        //   const data = await response.json();

        const response = await fetch(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=0LJLM45N47PJRYRU`
          );
          const data = await response.json();

          console.log("API Response:", data);

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
    } finally {
      setLoading(false); 
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
      {loading && <p>Loading stock...</p>} 
    </form>
  );
};

export default StockForm;