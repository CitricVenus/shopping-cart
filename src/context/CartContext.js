import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existingItem = state.find((p) => p.id === item.id);
      if (existingItem) {
        return state.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...state, { ...item, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((p) => p.id !== action.payload);
    case "INCREASE_QTY":
      return state.map((p) =>
        p.id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
      );
    case "DECREASE_QTY":
      return state.map((p) =>
        p.id === action.payload && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export const CartProvider = ({ children, initialCart = initialState }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCart);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const increaseQty = (id) => dispatch({ type: "INCREASE_QTY", payload: id });
  const decreaseQty = (id) => dispatch({ type: "DECREASE_QTY", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
