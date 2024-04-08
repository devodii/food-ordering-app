import * as React from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type UpdateAmount = 1 | -1;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: UpdateAmount) => void;
};

const CartContext = React.createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [items, setItems] = React.useState<CartItem[]>([]);

  const onAddItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      return updateQuantity(existingItem?.id, 1);
    }

    const newCartItem: CartItem = {
      product,
      size,
      product_id: product.id,
      quantity: 1,
      id: randomUUID(),
    };

    setItems((prev) => [...prev, newCartItem]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ items, addItem: onAddItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("cart context must be used withinits provider");
  }

  return context;
};

export { CartProvider, useCart };
