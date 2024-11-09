import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CurrencyOption from './CurrencyDropdown.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <CurrencyOption />
  </React.StrictMode>,
)
