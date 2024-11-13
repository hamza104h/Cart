import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  console.log(data)
  console.log(cart)

  const addtoCart = (item) => {
    const existingItem = cart.find(cartItem => 
    cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
        
    }

    setCart([...cart]);
};

  const removeFromCart = (id) => {
    setCart(cart.filter(item =>
   item.id !== id)); 
  };

  const incrementQuantity = (id) => {
    const updatedCart = [...cart]; 
    const item = updatedCart.find(item => 
    item.id === id); 
    item.quantity++;
    setCart(updatedCart) 
  };
  const decrementQuantity = (id) => {
    const updatedCart = [...cart];
    const item = updatedCart.find(item => 
    item.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    } else {
      removeFromCart(id); 
    }
  
    setCart(updatedCart); 
  };
  return (
    <>
      <ul className="parent">
        {data.map((dataItem) => (
          <div key={dataItem.id} className="container">
            <img className="imageSize" src={dataItem.image} alt={dataItem.title} />
            <li>{dataItem.title}</li>
            <li>{dataItem.description}</li>
            <li>Price: {dataItem.price}$</li>
            <button onClick={() => addtoCart(dataItem)}>Add to Cart</button>
          </div>
        ))}
      </ul>

      <h1>This is Cart Section</h1>
      <ul>
        {cart.map((cartitem) => (
          <div key={cartitem.id} className="cart-item"> 
            <li className="cart-title">{cartitem.title}</li>
            <button onClick={() => incrementQuantity(cartitem.id)}>+</button>
            <button onClick={() => decrementQuantity(cartitem.id)}>-</button>
            <li>Quantity: {cartitem.quantity}</li>
            <li>Total: {Math.round((cartitem.price * cartitem.quantity))}$</li>
            <button onClick={() => removeFromCart(cartitem.id)}>Remove</button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;