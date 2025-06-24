import { Cart } from "@/lib/shopify/types";
import { Flex } from "@mantine/core";
import Price from "../price";

const Subtotal = ({ cart }: { cart: Cart }) => {
  return (
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
      <h3>
        <Price
          amount={cart.cost.totalAmount.amount}
          currencyCode={cart.cost.totalAmount.currencyCode}
        />
      </h3>
    </Flex>
  );
};

export default Subtotal;
