"use client";

import { addItem, removeItem, updateItemQuantity } from "@/actions/actions";
import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/shopify/types";
import React, {
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic,
  useTransition,
} from "react";

export type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product; quantity: number };
    };

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
  optimisticCart: Cart | undefined;
  updateOptimisticCart: (action: CartAction) => void;
  addCartItem: (
    variant: ProductVariant,
    product: Product,
    quantity?: number
  ) => void;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product,
  quantity: number = 1
): CartItem {
  const newQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;
  const totalAmount = calculateItemCost(newQuantity, variant.price.amount);

  return {
    id: existingItem?.id,
    quantity: newQuantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "USD";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

      if (updatedLines.length === 0) {
        return {
          ...currentCart,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...currentCart.cost,
            totalAmount: { ...currentCart.cost.totalAmount, amount: "0" },
          },
        };
      }

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    case "ADD_ITEM": {
      const { variant, product, quantity } = action.payload;
      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product,
        quantity
      );

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...currentCart.lines, updatedItem];

      return {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  );
  const [, startTransition] = useTransition();

  const addCartItem = (
    variant: ProductVariant,
    product: Product,
    quantity: number = 1
  ) => {
    // Optimistic update wrapped in transition
    startTransition(() => {
      updateOptimisticCart({
        type: "ADD_ITEM",
        payload: { variant, product, quantity },
      });
    });

    // Server action
    startTransition(() => {
      addItem(null, { selectedVariantId: variant.id, quantity });
    });
  };

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    // Optimistic update wrapped in transition
    startTransition(() => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });
    });

    // Server action
    startTransition(() => {
      if (updateType === "delete") {
        removeItem(null, merchandiseId);
      } else {
        const currentItem = optimisticCart?.lines.find(
          (item) => item.merchandise.id === merchandiseId
        );
        if (currentItem) {
          const newQuantity =
            updateType === "plus"
              ? currentItem.quantity + 1
              : currentItem.quantity - 1;
          updateItemQuantity(null, { merchandiseId, quantity: newQuantity });
        }
      }
    });
  };

  const contextValue = useMemo(
    () => ({
      cartPromise,
      optimisticCart,
      updateOptimisticCart,
      addCartItem,
      updateCartItem,
    }),
    [
      cartPromise,
      optimisticCart,
      updateOptimisticCart,
      addCartItem,
      updateCartItem,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { optimisticCart, addCartItem, updateCartItem } = context;

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [optimisticCart, addCartItem, updateCartItem]
  );
}
