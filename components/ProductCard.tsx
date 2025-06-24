"use client";

import { Product } from "@/lib/shopify/types";
import { Flex } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import IconButton from "./ui/IconButton";

const ImageWrapper = styled.div<{ src: string }>`
  width: 120px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius);
  overflow: hidden;
  flex-shrink: 0;
`;

const ProductTitle = styled.h5`
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--brand-color-lighter);
  }

  &:active {
    color: var(--brand-color-darker);
  }
`;

const firstNChars = (str: string, n: number) =>
  str.length > n ? str.slice(0, n) + "..." : str;

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Flex w="100%" h="100%">
      <ImageWrapper src={product.featuredImage.url} />
      <Flex direction="column" gap="5px" flex="1" p="5px">
        <Flex justify="space-between">
          <Link
            href={`/product/${product.handle}`}
            style={{ textDecoration: "none" }}
            prefetch={true}
          >
            <ProductTitle>{product.title}</ProductTitle>
          </Link>
          <IconButton Icon={IconShoppingBagPlus} style={{ flexShrink: 0 }} />
        </Flex>
        <p>{firstNChars(product.description, 100)}</p>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "right",
            marginTop: "auto",
          }}
        >
          {product.priceRange.minVariantPrice.currencyCode}{" "}
          {product.priceRange.minVariantPrice.amount}
        </p>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
