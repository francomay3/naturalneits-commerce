"use client";

import { ProductVariant } from "@/lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useMemo,
  useOptimistic,
} from "react";

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

// TODO: this code is crap. how can the vercel team write such piece of crap? refactor and make it beautiful.
// the product privider shoudl return the product and a bunch of related data/functions. like for example the variants, the selected variant, the price, the default... etc.

export type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => ProductState;
  updateImage: (index: string) => ProductState;
  getSelectedVariant: (
    variants: ProductVariant[]
  ) => ProductVariant | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setOptimisticState] = useOptimistic(
    getInitialState(),
    (prevState: ProductState, update: ProductState) => ({
      ...prevState,
      ...update,
    })
  );

  const updateOption = (name: string, value: string) => {
    const newState = { [name]: value };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setOptimisticState(newState);
    return { ...state, ...newState };
  };

  const getSelectedVariant = (variants: ProductVariant[]) =>
    variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    );

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage,
      getSelectedVariant,
    }),
    [state]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
