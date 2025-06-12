// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link to="/" className="navbar-brand">
        Shopping Cart
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-3">
            <Link to="/cart" className="nav-link">
              Carrito{" "}
              <span className="badge bg-light text-dark">{totalCount}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
