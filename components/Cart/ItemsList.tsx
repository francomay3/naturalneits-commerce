"use client";

import Separator from "@/components/Separator";
import { useCart } from "@/contexts/CartContext";
import { Box, Flex } from "@mantine/core";
import EmptyCart from "./EmptyCart";
import Item from "./Item";

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
          <Box key={i}>
            <Item
              item={item}
              updateCartItem={updateCartItem}
              toggleCart={toggleCart}
            />
            {i < cart.lines.length - 1 && <Separator m="20" />}
          </Box>
        ))}
    </Flex>
  );
};

export default ItemsList;
