import Button from "@/components/ui/Button";
import { ProductOption, ProductVariant } from "@/lib/shopify/types";
import { useProduct, useUpdateURL } from "@/providers/product-context";
import { Tooltip } from "@mantine/core";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

type OptionProps = {
  value: string;
  option: ProductOption;
  variants: ProductVariant[];
  options: ProductOption[];
};

const Option = ({ option, variants, value, options }: OptionProps) => {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

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

  const optionNameLowerCase = option.name.toLowerCase();

  // Base option params on current selectedOptions so we can preserve any other param state.
  const optionParams = { ...state, [optionNameLowerCase]: value };

  // Filter out invalid options and check if the option combination is available for sale.
  const filtered = Object.entries(optionParams).filter(([key, value]) =>
    options.find(
      (option) =>
        option.name.toLowerCase() === key && option.values.includes(value)
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
        type="submit"
      >
        {value}
      </Button>
    </Tooltip>
  );
};

export default Option;
