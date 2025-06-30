"use client";

import { useCart } from "@/providers/cart-context";
import { Flex } from "@mantine/core";
import Item from "./Item";
import Separator from "./Separator";

const ItemsList = ({ toggleCart }: { toggleCart: () => void }) => {
  const { cart, updateCartItem } = useCart();

  if (!cart || cart.lines.length === 0) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: "200px" }}
      >
        <span style={{ color: "var(--text-color-secondary)" }}>
          No items in cart
        </span>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      {cart.lines
        .sort((a, b) =>
          a.merchandise.product.title.localeCompare(b.merchandise.product.title)
        )
        .map((item, i) => (
          <div key={i}>
            <Item
              item={item}
              updateCartItem={updateCartItem}
              toggleCart={toggleCart}
            />
            {i < cart.lines.length - 1 && <Separator m="20" />}
          </div>
        ))}
    </Flex>
  );
};

export default ItemsList;
