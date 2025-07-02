"use client";

import { addItem } from "@/actions/actions";
import { getCheapestAvailableVariant } from "@/lib/utils";
import { useCart } from "@/providers/cart-context";
import { useProduct } from "@/providers/product-context";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { Product } from "lib/shopify/types";
import { useActionState } from "react";
import IconButton from "./ui/IconButton";

// TODO: find a way to separate the logic from the UI, so that we can use this component in other places with different looks. maybe passing the UI as a prop.
export function AddToCartButton({
  product,
  style,
}: {
  product: Product;
  style?: React.CSSProperties;
}) {
  // TODO: all this logic is a bit cumbersome and also disconnected from the variant selector. would be nice to refactor. the selected variant should be a state in the product context.
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { getSelectedVariant } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const defaultVariantId = getCheapestAvailableVariant(variants)?.id;

  const variant = getSelectedVariant(variants);

  const selectedVariantId = variant?.id || defaultVariantId;

  const addItemAction = formAction.bind(null, selectedVariantId);

  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  )!;

  return (
    <form
      action={async () => {
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <IconButton
        type="submit"
        Icon={IconShoppingBagPlus}
        variant="filled"
        style={style}
        disabled={!availableForSale || !finalVariant?.availableForSale}
      />
      {message && (
        <p
          style={{ color: "var(--mantine-color-red-7)" }}
          aria-live="polite"
          className="sr-only"
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default AddToCartButton;
