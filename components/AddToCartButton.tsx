"use client";

import { useProduct } from "@/providers/ProductContext";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { Product } from "lib/shopify/types";
import IconButton from "./ui/IconButton";

export function AddToCartButton({
  product,
  style,
}: {
  product: Product;
  style?: React.CSSProperties;
}) {
  const { addToCart } = useProduct();
  const { availableForSale } = product;

  return (
    <form action={addToCart}>
      <IconButton
        type="submit"
        Icon={IconShoppingBagPlus}
        variant="filled"
        style={style}
        disabled={!availableForSale}
      />
    </form>
  );
}

export default AddToCartButton;
