import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CounterProdiver  } from './Context/Counter.jsx'
import Cart from './Context/Cart.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cart>
    <CounterProdiver>
    <App />
    </CounterProdiver>
    </Cart>
  </StrictMode>,
)
