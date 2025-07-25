"use client";

import { useProduct } from "@/contexts/ProductContext";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import IconButton from "./ui/IconButton";

export function AddToCartButton({ style }: { style?: React.CSSProperties }) {
  const { product, addToCart } = useProduct();
  const { availableForSale } = product;

  const handleAddToCart = () => {
    addToCart(1);
  };

  return (
    <IconButton
      onClick={handleAddToCart}
      Icon={IconShoppingBagPlus}
      variant="filled"
      style={style}
      disabled={!availableForSale}
    />
  );
}

export default AddToCartButton;
