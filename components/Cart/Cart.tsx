"use client";

import { createCartAndSetCookie, redirectToCheckout } from "@/actions/actions";
import Separator from "@/components/Separator";
import { useCart } from "@/contexts/CartContext";
import { ActionIcon, Button, Flex, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import ItemsList from "./ItemsList";
import Subtotal from "./Subtotal";

// TODO: Csrt buttons should be subtle or outlined

const Cart = ({ toggleCart }: { toggleCart: () => void }) => {
  const { cart } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  if (!cart) {
    // this will probably only render to users with very slow internet connection
    return <Text>loading cart...</Text>;
  }

  return (
    <Flex
      direction="column"
      bg="var(--background-color)"
      w="100%"
      h="100%"
      p="15px"
      pos="relative"
      style={{
        overflow: "scroll",
      }}
      className="hide-scrollbar"
    >
      <ActionIcon
        onClick={toggleCart}
        variant="subtle"
        pos="absolute"
        right="0"
        top="0"
      >
        <IconX size={20} />
      </ActionIcon>
      <Title order={3}>Cart ({cart?.totalQuantity || 0})</Title>
      <Separator />
      <ItemsList toggleCart={toggleCart} />
      <Separator />
      <Subtotal cart={cart} />
      <form
        action={redirectToCheckout}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <CheckoutButton />
      </form>
    </Flex>
  );
};

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      color="var(--mantine-color-secondary-filled)"
      type="submit"
      disabled={pending}
      mt="20"
    >
      {pending ? "Processing..." : "CHECKOUT"}
    </Button>
  );
}

export default Cart;
