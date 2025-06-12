// src/components/ProductList.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductList from "./ProductList";
import { CartProvider } from "../context/CartContext";

// Mock del fetchProducts para controlar datos en test
jest.mock("../api/products", () => ({
  fetchProducts: () =>
    Promise.resolve([
      { id: 1, name: "Producto A", price: 10, image: "img-a.jpg" },
      { id: 2, name: "Producto B", price: 20, image: "img-b.jpg" },
    ]),
}));

test("muestra productos y permite añadir al carrito", async () => {
  render(
    <CartProvider>
      <ProductList />
    </CartProvider>
  );

  // Esperamos que aparezca el producto
  await waitFor(() => {
    expect(screen.getByText("Producto A")).toBeInTheDocument();
  });

  // Verificar botones de añadir
  const addButtons = screen.getAllByText(/Agregar al carrito/i);
  expect(addButtons.length).toBe(2);

  // Simular click para añadir el primer producto
  fireEvent.click(addButtons[0]);

  // Aquí podrías comprobar que el carrito cambió, pero como el carrito está en contexto,
  // y no mostramos nada en ProductList, se testea mejor en Cart component.
});
