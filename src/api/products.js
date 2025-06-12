// src/api/products.js
export const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 19.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Producto 2",
    price: 29.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Producto 3",
    price: 9.99,
    image: "https://via.placeholder.com/150",
  },
];

// Función mock fetch (simula llamada async)
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}
