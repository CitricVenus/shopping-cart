// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar productos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
                <button
                  key={product.id}
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
