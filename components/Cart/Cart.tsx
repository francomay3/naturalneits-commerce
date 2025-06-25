"use client";

import { createCartAndSetCookie, redirectToCheckout } from "@/actions/actions";
import IconButton from "@/components/ui/IconButton";
import { useCart } from "@/providers/cart-context";
import { Flex } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import Button from "../ui/Button";
import ItemsList from "./ItemsList";
import Separator from "./Separator";
import Subtotal from "./Subtotal";

const Cart = ({ toggleCart }: { toggleCart: () => void }) => {
  const { cart } = useCart();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  // TODO: handle loading states. there is flickering when the cart gets emptied
  // TODO: abstract component instead of early return here. make it a bit tidier

  if (!cart || cart.lines.length === 0) {
    return (
      <Flex
        direction="column"
        bg="var(--background-color)"
        w="100%"
        h="100%"
        p="15px"
        pos="relative"
        align="center"
        justify="center"
        gap="20px"
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
        <h3>Your cart is empty</h3>
        <p
          style={{ textAlign: "center", color: "var(--text-color-secondary)" }}
        >
          Add some items to get started
        </p>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      bg="var(--background-color)"
      w="100%"
      h="100%"
      p="15px"
      pos="relative"
      style={{ overflow: "scroll" }}
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
      <h3>Cart ({cart.totalQuantity})</h3>
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
