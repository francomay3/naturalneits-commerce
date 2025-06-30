"use client";

import { useProduct, useUpdateURL } from "@/providers/product-context";
import { ButtonGroup, Tooltip } from "@mantine/core";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import Button from "./ui/Button";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

// TODO: refine this components UI

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return options.map((option) => (
    <form key={option.id} style={{ clear: "both" }}>
      <dl>
        <dt>{option.name}</dt>
        <dd>
          <ButtonGroup>
            {option.values.map((value) => {
              const optionNameLowerCase = option.name.toLowerCase();

              // Base option params on current selectedOptions so we can preserve any other param state.
              const optionParams = { ...state, [optionNameLowerCase]: value };

              // Filter out invalid options and check if the option combination is available for sale.
              const filtered = Object.entries(optionParams).filter(
                ([key, value]) =>
                  options.find(
                    (option) =>
                      option.name.toLowerCase() === key &&
                      option.values.includes(value)
                  )
              );

              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, value]) =>
                    combination[key] === value && combination.availableForSale
                )
              );

              // The option is active if it's in the selected options.
              const isSelected = state[optionNameLowerCase] === value;

              return (
                <Tooltip
                  label={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                  key={value}
                  openDelay={500}
                  closeDelay={100}
                >
                  <Button
                    formAction={() => {
                      const newState = updateOption(optionNameLowerCase, value);
                      updateURL(newState);
                    }}
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    variant={isSelected ? "filled" : "outline"}
                  >
                    {value}
                  </Button>
                </Tooltip>
              );
            })}
          </ButtonGroup>
        </dd>
      </dl>
    </form>
  ));
}
