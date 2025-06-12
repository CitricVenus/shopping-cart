// src/pages/Checkout.js
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Nombre es requerido";
    if (!formData.address) errs.address = "Dirección es requerida";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      setErrors({});
      setSuccess(true);
      clearCart();
    }
  };

  if (cartItems.length === 0 && !success)
    return <p className="text-center mt-4">Tu carrito está vacío.</p>;

  return (
    <div className="container mt-4">
      {success ? (
        <div className="alert alert-success" role="alert">
          ¡Gracias por tu compra, {formData.name}!
        </div>
      ) : (
        <>
          <h2>Revisa tu pedido</h2>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name} x {item.quantity}
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </li>
          </ul>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                id="address"
                name="address"
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success">
              Finalizar compra
            </button>
          </form>
        </>
      )}
    </div>
  );
}
