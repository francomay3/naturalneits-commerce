"use client";

import { useProduct } from "@/contexts/ProductContext";
import { Box, BoxProps, Flex, Title } from "@mantine/core";
import AddToCart from "./AddToCart";
import Option from "./Option";

// TODO: should update optimistically when the user changes the variant

export function VariantSelector(props: BoxProps) {
  const { product } = useProduct();
  const { options } = product;

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  return (
    <Box {...props}>
      <Title order={2} mb="24" ta={{ base: "start" }} mr={{ base: "0" }}>
        Options
      </Title>
      <Flex ml="8" gap="16" wrap="wrap" mb="50" justify={{ base: "start" }}>
        {options.map((option) => (
          <Option option={option} key={option.id} />
        ))}
      </Flex>

      <AddToCart />
    </Box>
  );
}
