"use client";

import { createCartAndSetCookie, redirectToCheckout } from "@/actions/actions";
import Separator from "@/components/Separator";
import IconButton from "@/components/ui/IconButton";
import { useCart } from "@/contexts/CartContext";
import { Flex, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import Button from "../ui/Button";
import ItemsList from "./ItemsList";
import Subtotal from "./Subtotal";

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
      <IconButton
        onClick={toggleCart}
        Icon={IconX}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
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
      secondary
      type="submit"
      disabled={pending}
      style={{
        paddingInline: "40px",
        marginTop: "20px",
      }}
    >
      {pending ? "Processing..." : "Checkout"}
    </Button>
  );
}

export default Cart;
