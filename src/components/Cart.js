// src/components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <p className="text-center mt-4">Tu carrito está vacío.</p>;

  return (
    <div className="container mt-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center border rounded p-3 mb-3"
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
            className="me-3"
          />
          <div className="flex-grow-1">
            <h5>{item.name}</h5>
            <p>${item.price.toFixed(2)}</p>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => decreaseQty(item.id)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>
            </div>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => removeItem(item.id)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <h4>Total: ${total.toFixed(2)}</h4>
    </div>
  );
}
