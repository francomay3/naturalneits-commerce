"use client";

import { removeItem, updateItemQuantity } from "@/actions/actions";
import { CartItem } from "@/lib/shopify/types";
import { UpdateType, useCart } from "@/providers/cart-context";
import { Flex } from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useTransition } from "react";
import Price from "../price";
import IconButton from "../ui/IconButton";
import Separator from "./Separator";

type MerchandiseSearchParams = {
  [key: string]: string;
};

const Item = ({
  item,
  updateCartItem,
  toggleCart,
}: {
  item: CartItem;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  toggleCart: () => void;
}) => {
  const [, removeFormAction] = useActionState(removeItem, null);
  const [, updateFormAction] = useActionState(updateItemQuantity, null);
  const [, startTransition] = useTransition();

  const merchandiseSearchParams = {} as MerchandiseSearchParams;

  item.merchandise.selectedOptions.forEach(
    ({ name, value }: { name: string; value: string }) => {
      if (value !== DEFAULT_OPTION) {
        merchandiseSearchParams[name.toLowerCase()] = value;
      }
    }
  );

  const merchandiseUrl = createUrl(
    `/product/${item.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams)
  );

  const handleQuantityUpdate = (type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? item.quantity + 1 : item.quantity - 1;
    const payload = {
      merchandiseId: item.merchandise.id,
      quantity: newQuantity,
    };

    startTransition(() => {
      updateCartItem(item.merchandise.id, type);
      updateFormAction(payload);
    });
  };

  const handleRemove = () => {
    startTransition(() => {
      updateCartItem(item.merchandise.id, "delete");
      removeFormAction(item.merchandise.id);
    });
  };

  return (
    <Flex gap="15px" pos="relative">
      <Link href={merchandiseUrl} onClick={() => toggleCart()}>
        <Image
          src={item.merchandise.product.featuredImage.url}
          alt={
            item.merchandise.product.featuredImage.altText ||
            item.merchandise.product.title
          }
          width={70}
          height={70}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Flex direction="column" flex="1" gap="10px">
        <Link
          href={merchandiseUrl}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <span style={{ fontWeight: "500" }}>
            {item.merchandise.product.title}
          </span>
        </Link>
        {item.merchandise.title !== DEFAULT_OPTION && (
          <span
            style={{ fontSize: "14px", color: "var(--text-color-secondary)" }}
          >
            {item.merchandise.title}
          </span>
        )}
        <Flex gap="10px" align="center">
          <IconButton
            Icon={IconMinus}
            onClick={() => handleQuantityUpdate("minus")}
          />
          <span>{item.quantity}</span>
          <IconButton
            Icon={IconPlus}
            onClick={() => handleQuantityUpdate("plus")}
          />
        </Flex>
      </Flex>
      <div style={{ marginTop: "auto", textAlign: "right" }}>
        <Price
          amount={item.cost.totalAmount.amount}
          currencyCode={item.cost.totalAmount.currencyCode}
          style={{ color: "var(--brand-color)", fontWeight: "500" }}
        />
      </div>
      <IconButton
        Icon={IconTrash}
        onClick={handleRemove}
        style={{ position: "absolute", right: -14, top: -14 }}
      />
    </Flex>
  );
};

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
