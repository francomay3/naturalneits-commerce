import { useProduct } from "@/contexts/ProductContext";
import { Product, ProductOption, ProductVariant } from "@/lib/shopify/types";
import { Button, Tooltip } from "@mantine/core";

type ValueProps = {
  option: ProductOption;
  value: string;
};

const getIsSelected = (
  selectedVariant: ProductVariant | null,
  option: ProductOption,
  value: string
) => {
  return (
    selectedVariant?.selectedOptions.find(
      (selectedOption) => selectedOption.name === option.name
    )?.value === value
  );
};

const getVariantForThisValue = (
  product: Product,
  selectedVariant: ProductVariant | null,
  option: ProductOption,
  value: string
): ProductVariant | null => {
  return (
    product.variants.find((variant) => {
      const otherOptions =
        selectedVariant?.selectedOptions.filter(
          (selectedOption) => selectedOption.name !== option.name
        ) || [];

      return variant.selectedOptions.every((variantOption) => {
        if (variantOption.name === option.name) {
          return variantOption.value === value;
        }
        return otherOptions.some(
          (otherOption) =>
            otherOption.name === variantOption.name &&
            otherOption.value === variantOption.value
        );
      });
    }) || null
  );
};

const getTooltipText = (
  variantForThisValue: ProductVariant | null,
  option: ProductOption,
  value: string
) => {
  const isOutOfStock = variantForThisValue?.currentlyNotInStock ?? false;
  const stockQuantity = variantForThisValue?.quantityAvailable ?? 0;

  if (!variantForThisValue) return `${option.name} ${value} (Not Available)`;
  if (isOutOfStock) return `${option.name} ${value} (Out of Stock)`;
  if (stockQuantity > 0)
    return `${option.name} ${value} (${stockQuantity} in stock)`;
  return `${option.name} ${value}`;
};

const Value = ({ option, value }: ValueProps) => {
  const { selectedVariant, setSelectedVariant, product } = useProduct();

  const isSelected = getIsSelected(selectedVariant, option, value);

  // Find the variant that would be selected if this value is chosen
  const variantForThisValue = getVariantForThisValue(
    product,
    selectedVariant,
    option,
    value
  );

  const tooltipText = getTooltipText(variantForThisValue, option, value);

  return (
    <Tooltip label={tooltipText}>
      <Button
        formAction={() => setSelectedVariant(variantForThisValue || null)}
        aria-disabled={!variantForThisValue?.availableForSale}
        disabled={!variantForThisValue?.availableForSale}
        variant={isSelected ? "filled" : "outline"}
        type="submit"
      >
        {value}
      </Button>
    </Tooltip>
  );
};

export default Value;
