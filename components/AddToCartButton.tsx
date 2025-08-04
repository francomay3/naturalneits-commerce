"use client";

import { useProduct } from "@/contexts/ProductContext";
import { ActionIcon } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";

export function AddToCartButton({ style }: { style?: React.CSSProperties }) {
  const { product, addToCart } = useProduct();
  const { availableForSale } = product;

  const handleAddToCart = () => {
    addToCart(1);
  };

  return (
    <ActionIcon
      onClick={handleAddToCart}
      variant="filled"
      style={style}
      disabled={!availableForSale}
    >
      <IconShoppingBagPlus size={20} />
    </ActionIcon>
  );
}

export default AddToCartButton;
