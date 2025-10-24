import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import { HomePage } from './Pages/HomePage';
import { CheckoutPage } from './Pages/CheckoutPage';
import { OrdersPage } from './Pages/OrdersPage';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get('http://localhost:3000/api/cart-items?expand=product');
    setCart(response.data);
  };
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>}></Route>
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />}></Route>
      <Route path="orders" element={<OrdersPage cart={cart} />}></Route>
    </Routes>

  )
}

export default App
