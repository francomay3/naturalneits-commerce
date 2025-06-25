import { Cart } from "@/lib/shopify/types";
import { getCartSubtotal } from "@/lib/utils";
import { Flex } from "@mantine/core";

const Subtotal = ({ cart }: { cart: Cart }) => {
  return (
    <Flex justify="space-between" gap="20px" wrap="wrap">
      <Flex direction="column" gap="10px">
        <h5>Subtotal</h5>
        <span
          style={{
            fontSize: "12px",
            color: "var(--brand-color)",
          }}
        >
          Taxes and shipping calculated at checkout
        </span>
      </Flex>
      <h3>{getCartSubtotal(cart)}</h3>
    </Flex>
  );
};

export default Subtotal;
