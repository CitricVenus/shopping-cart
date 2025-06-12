// src/api/products.js
const products = [
  {
    id: 1,
    name: "Cámara DSLR Canon",
    price: 499.99,
    quantity: 2,
    image:
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Auriculares Bluetooth",
    price: 79.99,
    quantity: 1,
    image:
      "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Smartwatch Deportivo",
    price: 199.99,
    quantity: 3,
    image:
      "https://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

// Función mock fetch (simula llamada async)
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}
