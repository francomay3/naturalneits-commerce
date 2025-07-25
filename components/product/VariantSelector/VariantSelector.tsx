"use client";

import { useProduct } from "@/contexts/ProductContext";
import { formatPrice } from "@/lib/utils";
import { Box, BoxProps, Flex, Text, Title } from "@mantine/core";
import AddToCart from "./AddToCart";
import Option from "./Option";

export function VariantSelector(props: BoxProps) {
  const { product, selectedVariant } = useProduct();
  const { options } = product;

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const formattedPrice = selectedVariant
    ? formatPrice(
        selectedVariant?.price.amount,
        selectedVariant?.price.currencyCode
      )
    : "";

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
      <Flex direction="column" align="end">
        <Flex gap="4">
          <Text fz="22px" fw="bold">
            {formattedPrice}
          </Text>
          <Text fz="16px" fw="normal">
            each
          </Text>
        </Flex>
        <AddToCart />
      </Flex>
    </Box>
  );
}
