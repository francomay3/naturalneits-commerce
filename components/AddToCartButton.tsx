"use client";

import { addItem } from "@/actions/actions";
import { useCart } from "@/providers/cart-context";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { Product } from "lib/shopify/types";
import { useActionState } from "react";
import IconButton from "./ui/IconButton";

export function AddToCartButton({
  product,
  style,
}: {
  product: Product;
  style?: React.CSSProperties;
}) {
  const { variants } = product;
  const { addCartItem } = useCart();
  const [, formAction] = useActionState(addItem, null);

  const variant = variants.find((v) => v.availableForSale);
  const addItemAction = formAction.bind(null, variant?.id);

  return (
    <form
      action={async () => {
        addCartItem(variant!, product);
        addItemAction();
      }}
    >
      <IconButton
        type="submit"
        Icon={IconShoppingBagPlus}
        variant="filled"
        style={style}
        disabled={!variant?.availableForSale}
      />
    </form>
  );
}

export default AddToCartButton;
