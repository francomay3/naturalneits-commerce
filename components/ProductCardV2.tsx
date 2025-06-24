"use client";

import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { Flex } from "@mantine/core";
import { IconShoppingBagPlus } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import IconButton from "./ui/IconButton";

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
    <Link href={`/product/${product.handle}`} prefetch={true}>
      <Flex direction="column" gap="10px">
        <ImageWrapper src={imageUrl ?? ""}>
          <IconButton
            Icon={IconShoppingBagPlus}
            variant="filled"
            onClick={(e) => {
              e.preventDefault();
              // TODO: add product to cart
            }}
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
            }}
          />
        </ImageWrapper>
        <h5 style={{ textAlign: "center" }}>{title}</h5>
        <p style={{ textAlign: "center" }}>{formattedPrice}</p>
      </Flex>
    </Link>
  );
};

export default ProductCard;
