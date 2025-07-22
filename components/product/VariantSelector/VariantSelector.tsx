"use client";

import { AddToCartButton } from "@/components/AddToCartButton";
import { useProduct } from "@/contexts/ProductContext";
import { formatPrice } from "@/lib/utils";
import { Box, Text, Title } from "@mantine/core";
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
      <Title order={2} mb="24">
        Options
      </Title>
      <Box ml="8">
        {options.map((option) => (
          <Option option={option} key={option.id} />
        ))}
      </Box>
      <Text fz="22px" fw="bold" mb="30px">
        {formattedPrice}
      </Text>
      {/* TODO: this button is not intuitive at all. fix the design. how should the add to cart UI look like? */}
      {/* TODO: take inspiration from https://thoroughfaredesign.com/shop/art-prints/crossing-the-quiet */}
      <AddToCartButton product={product} />
    </Box>
  );
}
