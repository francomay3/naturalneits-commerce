"use client";

import { useCart } from "@/providers/cart-context";
import { Flex } from "@mantine/core";
import EmptyCart from "./EmptyCart";
import Item from "./Item";
import Separator from "./Separator";

const ItemsList = ({ toggleCart }: { toggleCart: () => void }) => {
  const { cart, updateCartItem } = useCart();

  if (!cart || cart.lines.length === 0) {
    return <EmptyCart />;
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
