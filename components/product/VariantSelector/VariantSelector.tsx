"use client";

import { Box } from "@mantine/core";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import Options from "./Options";

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  return (
    <Box>
      <h2 style={{ marginBottom: 24 }}>Options</h2>
      <Box ml="7">
        {options.map((option) => (
          <Options
            option={option}
            options={options}
            variants={variants}
            key={option.id}
          />
        ))}
      </Box>
    </Box>
  );
}
