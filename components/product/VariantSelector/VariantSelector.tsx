"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { useProduct } from "@/contexts/ProductContext";
import { formatPrice } from "@/lib/utils";
import { Box } from "@mantine/core";
import Option from "./Option";

export function VariantSelector() {
  const { product, selectedVariant } = useProduct();
  const { options } = product;

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

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
          <Option option={option} key={option.id} />
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
