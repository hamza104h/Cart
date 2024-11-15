import { useState, useEffect } from "react";
import './App.css';
import { useContext } from "react";
import { counterContext } from "./Context/Counter";
import { CartContext } from "./Context/Cart";

function App() {

  const counter = useContext(counterContext)
  const cart = useContext(CartContext)


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => counter.setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addtoCart = (item) => {
    const existingItem = cart.cartdata.find(cartItem => 
    cartItem.id === item.id);
    if (existingItem) { 
        existingItem.quantity++;
    } else {
        cart.cartdata.push({ ...item, quantity: 1 });
        
    }

    cart.setCart([...cart.cartdata]);
};

  const removeFromCart = (id) => {
    cart.setCart(cart.cartdata.filter(item =>
   item.id !== id)); 
  };

  const incrementQuantity = (id) => {
    const updatedCart = [...cart.cartdata]; 
    const item = updatedCart.find(item => 
    item.id === id); 
    item.quantity++;
    cart.setCart(updatedCart) 
  };
  const decrementQuantity = (id) => {
    const updatedCart = [...cart.cartdata];
    const item = updatedCart.find(item => 
    item.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    } else {
      removeFromCart(id); 
    }
  
    cart.setCart(updatedCart); 
  };
  return (
    <>
      <ul className="parent">
        {counter.data.map((dataItem) => (
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
        {cart.cartdata.map((cartitem) => (
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
