import './CurrencyStyling.css';
//import { useEffect } from "react";

function App() {
    return (
        <div className="dropdown-container">
            <span>I want to convert</span>
            <select name="currency" id="currencySelect1">
                <option value="usd">USD</option>
                <option value="jpy">JPY</option>
                <option value="sgd">SGD</option>
                <option value="myr">MYR</option>
            </select>
            <span>to</span>
            <select name="currency" id="currencySelect2">
                <option value="usd">USD</option>
                <option value="jpy">JPY</option>
                <option value="sgd">SGD</option>
                <option value="myr">MYR</option>
            </select>
        </div>
    )
}

export default App;