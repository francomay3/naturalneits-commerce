import IconButton from "@/components/ui/IconButton";
import { Flex } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Button from "../ui/Button";
import ItemsList from "./ItemsList";
import Separator from "./Separator";

const Cart = ({ toggleCart }: { toggleCart: () => void }) => {
  const numberOfItems = 0; // TODO: get the number of items from the cart
  return (
    <Flex
      direction="column"
      bg="var(--background-color)"
      w="100%"
      h="100%"
      p="15px"
      pos="relative"
    >
      <IconButton
        onClick={toggleCart}
        Icon={IconX}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
      <h3>Cart ({numberOfItems})</h3>
      <Separator m="20" />
      <ItemsList />
      <Separator m="20" />
      <Flex direction="column" justify="space-between" gap="20px">
        <Flex direction="column" gap="10px">
          <h5>Subtotal</h5>
          <p
            style={{
              fontSize: "12px",
              color: "var(--brand-color)",
            }}
          >
            Taxes and shipping calculated at checkout
          </p>
        </Flex>
        <h3>$30.00</h3>
      </Flex>
      <Button
        secondary
        style={{
          paddingInline: "40px",
          marginLeft: "auto",
          marginTop: "20px",
        }}
      >
        Checkout
      </Button>
    </Flex>
  );
};

export default Cart;
