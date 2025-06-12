// src/components/Cart.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";

// Mock del hook useCart
jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

import { useCart } from "../context/CartContext";

describe("Cart component", () => {
  const mockIncreaseQty = jest.fn();
  const mockDecreaseQty = jest.fn();
  const mockRemoveItem = jest.fn();

  const mockCartItems = [
    { id: 1, name: "Producto A", price: 10, quantity: 2, image: "img1.jpg" },
    { id: 2, name: "Producto B", price: 5, quantity: 1, image: "img2.jpg" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("muestra mensaje si el carrito está vacío", () => {
    useCart.mockReturnValue({
      cartItems: [],
      increaseQty: mockIncreaseQty,
      decreaseQty: mockDecreaseQty,
      removeItem: mockRemoveItem,
    });
    render(<Cart />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test("renderiza items y total correctamente", () => {
    useCart.mockReturnValue({
      cartItems: mockCartItems,
      increaseQty: mockIncreaseQty,
      decreaseQty: mockDecreaseQty,
      removeItem: mockRemoveItem,
    });
    render(<Cart />);

    // Verificar que los nombres están
    expect(screen.getByText("Producto A")).toBeInTheDocument();
    expect(screen.getByText("Producto B")).toBeInTheDocument();

    // Verificar que las cantidades están (buscando el número 2 y 1 en el documento)
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    // Verificar el total
    expect(screen.getByText("Total: $25.00")).toBeInTheDocument();
  });

  test("llama a increaseQty al hacer click en +", () => {
    useCart.mockReturnValue({
      cartItems: mockCartItems,
      increaseQty: mockIncreaseQty,
      decreaseQty: mockDecreaseQty,
      removeItem: mockRemoveItem,
    });
    render(<Cart />);
    const buttons = screen.getAllByText("+");
    fireEvent.click(buttons[0]);
    expect(mockIncreaseQty).toHaveBeenCalledWith(1);
  });

  test("llama a decreaseQty al hacer click en -", () => {
    useCart.mockReturnValue({
      cartItems: mockCartItems,
      increaseQty: mockIncreaseQty,
      decreaseQty: mockDecreaseQty,
      removeItem: mockRemoveItem,
    });
    render(<Cart />);
    const buttons = screen.getAllByText("-");
    fireEvent.click(buttons[0]);
    expect(mockDecreaseQty).toHaveBeenCalledWith(1);
  });

  test("llama a removeItem al hacer click en Eliminar", () => {
    useCart.mockReturnValue({
      cartItems: mockCartItems,
      increaseQty: mockIncreaseQty,
      decreaseQty: mockDecreaseQty,
      removeItem: mockRemoveItem,
    });
    render(<Cart />);
    const deleteButtons = screen.getAllByText("Eliminar");
    fireEvent.click(deleteButtons[0]);
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });
});
