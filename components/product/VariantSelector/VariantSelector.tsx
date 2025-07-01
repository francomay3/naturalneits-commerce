"use client";

import { ProductOption, ProductVariant } from "lib/shopify/types";
import Options from "./Options";

// TODO: refine this components UI. it looks horrible

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

  return options.map((option) => (
    <Options
      option={option}
      options={options}
      variants={variants}
      key={option.id}
    />
  ));
}
