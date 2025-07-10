"use client";

import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/providers/cart-context";
import { ProductProvider } from "@/providers/ProductContext";
import { ActionIcon, Box, Flex } from "@mantine/core";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import AddToCartButton from "../AddToCartButton";

const ProductImage = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  overflow: hidden;
`;

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
      <Flex direction="column">
        <Box pos="relative" mb="18">
          <Link href={`/product/${product.handle}`} prefetch={true}>
            <ProductImage src={imageUrl ?? ""}></ProductImage>
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
          <h5 style={{ textAlign: "center", marginBottom: 8 }}>{title}</h5>
          <div style={{ textAlign: "center" }}>
            {hasMultiplePrices ? "from " : ""}
            {formattedPrice}
          </div>
        </Link>
      </Flex>
    </ProductProvider>
  );
};

export default ProductCard;
