import IconButton from "@/components/ui/IconButton";
import { useCart } from "@/contexts/CartContext";
import { Badge, Box } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconShoppingBag, IconShoppingBagPlus } from "@tabler/icons-react";
import { useEffect, useRef } from "react";

const CartButton = ({ onCartClick }: { onCartClick: () => void }) => {
  const { cart } = useCart();
  const itemCount = cart?.totalQuantity || 0;
  const lineCount = cart?.lines.length || 0;
  const prevLineCountRef = useRef(lineCount);

  useEffect(() => {
    const prevLineCount = prevLineCountRef.current;

    if (lineCount > prevLineCount) {
      // open the cart
      notifications.show({
        message: "Items added to cart",
        color: "#74b816",
        icon: <IconShoppingBagPlus size={16} />,
      });
    } else if (lineCount < prevLineCount) {
      // Code to run when items are removed from the cart
    }

    prevLineCountRef.current = lineCount;
  }, [lineCount]);

  useEffect(() => {}, [lineCount]);

  return (
    <Box pos="relative">
      <IconButton Icon={IconShoppingBag} onClick={onCartClick} />
      {itemCount > 0 && (
        <Badge
          pos="absolute"
          top={5}
          right={3}
          circle
          size="xs"
          color="red"
          styles={{ label: { color: "white" } }}
        >
          {itemCount}
        </Badge>
      )}
    </Box>
  );
};

export default CartButton;
