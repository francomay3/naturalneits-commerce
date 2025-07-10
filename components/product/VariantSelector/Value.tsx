import Button from "@/components/ui/Button";
import { useProduct } from "@/contexts/ProductContext";
import { ProductOption } from "@/lib/shopify/types";
import { Tooltip } from "@mantine/core";

type ValueProps = {
  option: ProductOption;
  value: string;
};

const Value = ({ option, value }: ValueProps) => {
  const { selectedVariant, setSelectedVariant, product } = useProduct();

  const isSelected =
    selectedVariant?.selectedOptions.find(
      (selectedVariantOption) => selectedVariantOption.name === option.name
    )?.value === value;

  const selectedVariantSelectedOptions = selectedVariant?.selectedOptions;
  const thisButtonSelectedOptions = selectedVariantSelectedOptions?.map(
    (selectedOption) => {
      if (selectedOption.name === option.name) {
        return { ...selectedOption, value };
      }
      return selectedOption;
    }
  );

  const thisButtonVariant =
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (variantOption, index) =>
          variantOption.name === thisButtonSelectedOptions?.[index]?.name &&
          variantOption.value === thisButtonSelectedOptions?.[index]?.value
      )
    ) || null;

  const isAvailableForSale = thisButtonVariant?.availableForSale;

  return (
    <Tooltip
      label={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
      key={value}
      openDelay={500}
      closeDelay={100}
    >
      <Button
        formAction={() => setSelectedVariant(thisButtonVariant)}
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

export default Value;
