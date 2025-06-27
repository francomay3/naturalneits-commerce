"use client";

import { addItem } from "@/actions/actions";
import { useCart } from "@/providers/cart-context";
import { notifications } from "@mantine/notifications";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import { Product } from "lib/shopify/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
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

  const variant = variants[0]!;
  const addItemAction = formAction.bind(null, variant.id);

  return (
    <form
      action={async () => {
        addCartItem(variant, product);
        addItemAction();
        // TODO: this says that the item was added inmediately, before waiting for the action to complete. fix!
        notifications.show({
          message: "Item added to cart!",
          withCloseButton: true,
          color: "green",
          icon: <IconShoppingBagPlus size={16} />,
        });
      }}
    >
      <SubmitButton style={style} />
    </form>
  );
}

const SubmitButton = ({ style }: { style?: React.CSSProperties }) => {
  const { pending } = useFormStatus();

  return (
    <IconButton
      type="submit"
      Icon={IconShoppingBagPlus}
      variant="filled"
      style={style}
      loading={pending}
    />
  );
};

export default AddToCartButton;
