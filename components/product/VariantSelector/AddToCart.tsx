import Button from "@/components/ui/Button";
import { useProduct } from "@/contexts/ProductContext";
import { ProductVariant } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { Flex, NumberInput, Text } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const numberInputStyles = {
  input: {
    width: "70px",
    height: "44px",
  },
  label: {
    position: "absolute",
    top: "-4px",
    left: "0",
    width: "max-content",
    transform: "translateY(-100%)",
  },
  root: {
    position: "relative",
  },
} as const;

const useAdjustQuantityOnVariantChange = (
  quantity: string | number,
  selectedVariant: ProductVariant | null,
  setQuantity: (quantity: number) => void
) => {
  useEffect(() => {
    if (
      typeof selectedVariant?.quantityAvailable !== "number" ||
      typeof quantity !== "number"
    ) {
      return;
    }

    if (selectedVariant?.quantityAvailable < quantity) {
      setQuantity(selectedVariant?.quantityAvailable);
    }
  }, [selectedVariant]);
};

const Label = ({
  selectedVariant,
}: {
  selectedVariant: ProductVariant | null;
}) => {
  return (
    <Flex direction="column">
      <Text m="0" lh="1.2">
        Quantity
      </Text>
      <Text m="0" lh="1.2">
        ({selectedVariant?.quantityAvailable} in stock)
      </Text>
    </Flex>
  );
};

const AddToCart = () => {
  const { addToCart, selectedVariant } = useProduct();
  const [quantity, setQuantity] = useState<string | number>(1);

  useAdjustQuantityOnVariantChange(quantity, selectedVariant, setQuantity);

  const totalFormattedPrice = selectedVariant
    ? formatPrice(
        String(parseFloat(selectedVariant?.price.amount) * Number(quantity)),
        selectedVariant?.price.currencyCode
      )
    : "";

  return (
    <Flex direction="column" align="end">
      <Flex gap="4">
        <Text fz="22px" fw="bold">
          {totalFormattedPrice}
        </Text>
        <Text fz="16px" fw="normal">
          total
        </Text>
      </Flex>

      <Flex gap="8">
        <NumberInput
          label={<Label selectedVariant={selectedVariant} />}
          placeholder="1"
          allowNegative={false}
          min={1}
          max={selectedVariant?.quantityAvailable}
          value={quantity}
          onChange={setQuantity}
          styles={numberInputStyles}
        />
        <Button
          onClick={() => addToCart(Number(quantity))}
          styles={{
            label: {
              fontWeight: "bold",
              color: "var(--background-color)",
              letterSpacing: "1.3px",
            },
          }}
          rightSection={
            <IconShoppingBagPlus color="var(--background-color)" size={20} />
          }
        >
          ADD TO CART
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddToCart;
