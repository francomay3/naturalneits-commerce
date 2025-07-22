"use client";

import { useCart } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { ActionIcon, Box, Flex, Text, Title } from "@mantine/core";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";

const useItemIsInCart = ({ product }: { product: Product }) => {
  const { cart } = useCart();
  const variant = product.variants[0]!;
  const itemIsInCart = cart?.lines.find(
    (line) => line.merchandise.id === variant.id
  );

  return itemIsInCart;
};

const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product.featuredImage?.url;
  const title = product.title;
  const formattedPrice = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );
  const itemIsInCart = useItemIsInCart({ product });

  const variantPrices = product.variants.map((variant) => variant.price.amount);
  const hasMultiplePrices = variantPrices.find(
    (price) => price !== variantPrices[0]
  );

  return (
    <ProductProvider product={product}>
      <Flex direction="column" w="100%">
        <Box pos="relative" mb="18">
          <Link href={`/product/${product.handle}`} prefetch={true}>
            <Box
              w="100%"
              bgsz="cover"
              bgp="center"
              style={{
                backgroundImage: `url(${imageUrl ?? ""})`,
                overflow: "hidden",
                aspectRatio: "1/1",
              }}
              bdrs="var(--border-radius)"
            ></Box>
          </Link>
          {itemIsInCart ? (
            <ActionIcon
              variant="filled"
              color="green"
              size={44}
              style={{
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            >
              <IconShoppingBagCheck size={20} color="white" />
            </ActionIcon>
          ) : (
            <AddToCartButton
              product={product}
              style={{
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            />
          )}
        </Box>
        <Link href={`/product/${product.handle}`} prefetch={true}>
          <Title order={5} mb="8" ta="center">
            {title}
          </Title>
          <Text ta="center">
            {hasMultiplePrices ? "from " : ""}
            {formattedPrice}
          </Text>
        </Link>
      </Flex>
    </ProductProvider>
  );
};

export default ProductCard;
