"use client";

import { Product, ProductVariant } from "@/lib/shopify/types";
import { getCheapestAvailableVariant } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useCart } from "./CartContext";

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

interface ProductContextType {
  product: Product;
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant | null) => void;
  addToCart: (quantity?: number) => void;
  availableForSale: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
  product: Product;
}

export function ProductProvider({ children, product }: ProductProviderProps) {
  const searchParams = useSearchParams();
  const updateURL = useUpdateURL();

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

  const addToCart = (quantity: number = 1) => {
    if (selectedVariant) {
      addCartItem(selectedVariant, product, quantity);
    }
  };

  const handleSetSelectedVariant = (variant: ProductVariant | null) => {
    setSelectedVariant(variant);
    const newState = variant?.selectedOptions.reduce(
      (acc, selectedOption) => {
        acc[selectedOption.name.toLowerCase()] = selectedOption.value;
        return acc;
      },
      {} as Record<string, string>
    );
    updateURL(newState || {});
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        selectedVariant,
        setSelectedVariant: handleSetSelectedVariant,
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
