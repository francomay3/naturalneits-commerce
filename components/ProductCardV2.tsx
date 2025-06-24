"use client";

import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { Flex } from "@mantine/core";
import Link from "next/link";
import styled from "styled-components";
import AddToCartButton from "./AddToCartButton";
import { ProductProvider } from "./product/product-context";

const ImageWrapper = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
`;

const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product.featuredImage?.url;
  const title = product.title;
  const price = product.priceRange.minVariantPrice.amount;
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;
  const formattedPrice = formatPrice(price, currencyCode);

  return (
    <ProductProvider>
      <Link href={`/product/${product.handle}`} prefetch={true}>
        <Flex direction="column" gap="10px">
          <ImageWrapper src={imageUrl ?? ""}>
            <AddToCartButton
              product={product}
              style={{
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            />
          </ImageWrapper>
          <h5 style={{ textAlign: "center", marginBottom: 10 }}>{title}</h5>
          <p style={{ textAlign: "center" }}>{formattedPrice}</p>
        </Flex>
      </Link>
    </ProductProvider>
  );
};

export default ProductCard;
