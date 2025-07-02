"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { useProduct } from "@/providers/product-context";
import { Box } from "@mantine/core";
import { Product } from "lib/shopify/types";
import Options from "./Options";

export function VariantSelector({ product }: { product: Product }) {
  const { options, variants } = product;
  const { getSelectedVariant } = useProduct();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const selectedVariant = getSelectedVariant(variants);
  const formattedPrice = selectedVariant
    ? formatPrice(
        selectedVariant?.price.amount,
        selectedVariant?.price.currencyCode
      )
    : "";

  return (
    <Box>
      <h2 style={{ marginBottom: 24 }}>Options</h2>
      <Box ml="8">
        {options.map((option) => (
          <Options
            option={option}
            options={options}
            variants={variants}
            key={option.id}
          />
        ))}
      </Box>
      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        {formattedPrice}
      </p>
      {/* TODO: this button is not intuitive at all. fix the design. how should the add to cart UI look like? */}
      <AddToCartButton product={product} />
    </Box>
  );
}
