// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar producto al carrito
  const onAddToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === product.id);
      if (exist) {
        // Aumentar cantidad
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
