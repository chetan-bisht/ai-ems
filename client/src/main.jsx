import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router' // Import Router
import App from './App.jsx'
import './index.css' // <--- This loads Tailwind!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
