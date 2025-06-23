"use client";

import { Product } from "@/lib/shopify/types";
import { Flex } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import IconButton from "./ui/IconButton";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  padding: 5px;
`;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
    <Wrapper>
      <ImageWrapper src={product.featuredImage.url} />
      <Info>
        <Flex justify="space-between">
          <Link
            href={`/product/${product.handle}`}
            style={{ textDecoration: "none" }}
          >
            <ProductTitle>{product.title}</ProductTitle>
          </Link>
          <IconButton
            Icon={IconShoppingBagPlus}
            color="var(--secondary-color)"
            style={{ flexShrink: 0 }}
            outlined
          />
        </Flex>
        <p>{firstNChars(loremIpsum, 100)}</p>
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
      </Info>
    </Wrapper>
  );
};

export default ProductCard;
