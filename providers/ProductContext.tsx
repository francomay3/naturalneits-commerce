"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { getCheapestAvailableVariant } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useCart } from "./cart-context";

interface ProductContextType {
  product: Product;
  selectedVariant: ProductVariant | null;
  setSelectedVariant: Dispatch<SetStateAction<ProductVariant | null>>;
  addToCart: () => void;
  availableForSale: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
  product: Product;
}

export function ProductProvider({ children, product }: ProductProviderProps) {
  const searchParams = useSearchParams();

  // Get the default variant based on URL parameters or fall back to cheapest
  const defaultVariant = useMemo(() => {
    // Get state from URL parameters
    const state: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      state[key] = value;
    }

    // Try to find variant based on URL parameters
    const variantFromURL = product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    );

    if (variantFromURL && variantFromURL.availableForSale) {
      return variantFromURL;
    }

    // If no variant found from URL or it's not available, fall back to cheapest
    return getCheapestAvailableVariant(product.variants);
  }, [product.variants, searchParams]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    defaultVariant
  );
  const { addCartItem } = useCart();

  const addToCart = () => {
    if (selectedVariant) {
      addCartItem(selectedVariant, product);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        selectedVariant,
        setSelectedVariant,
        addToCart,
        availableForSale: Boolean(selectedVariant?.availableForSale),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct(): ProductContextType {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: Record<string, string>) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
