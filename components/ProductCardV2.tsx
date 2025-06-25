"use client";

import { Product } from "@/lib/shopify/types";
import { getProductFormattedPrice } from "@/lib/utils";
import { Box, Flex } from "@mantine/core";
import Link from "next/link";
import styled from "styled-components";
import AddToCartButton from "./AddToCartButton";
import { ProductProvider } from "./product/product-context";

const ProductImage = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product.featuredImage?.url;
  const title = product.title;
  const formattedPrice = getProductFormattedPrice(product);

  return (
    <ProductProvider>
      <Flex direction="column">
        <Box pos="relative" mb="18">
          <Link href={`/product/${product.handle}`} prefetch={true}>
            <ProductImage src={imageUrl ?? ""}></ProductImage>
          </Link>
          <AddToCartButton
            product={product}
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
            }}
          />
        </Box>
        <Link href={`/product/${product.handle}`} prefetch={true}>
          <h5 style={{ textAlign: "center", marginBottom: 8 }}>{title}</h5>
          <div style={{ textAlign: "center" }}>{formattedPrice}</div>
        </Link>
      </Flex>
    </ProductProvider>
  );
};

export default ProductCard;
