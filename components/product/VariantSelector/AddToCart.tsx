import Button from "@/components/ui/Button";
import { useProduct } from "@/contexts/ProductContext";
import { Flex, NumberInput } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { useState } from "react";

const AddToCart = () => {
  const { addToCart } = useProduct();
  const [quantity, setQuantity] = useState<string | number>(1);

  return (
    <Flex gap="8">
      <NumberInput
        label="Quantity"
        placeholder="1"
        allowNegative={false}
        min={1}
        max={99}
        value={quantity}
        onChange={setQuantity}
        styles={{
          input: {
            width: "70px",
            height: "44px",
          },
          label: {
            position: "absolute",
            top: "-20px",
            left: "0",
          },
          root: {
            position: "relative",
          },
        }}
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
  );
};

export default AddToCart;
