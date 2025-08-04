"use client";

import { useCart } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { ActionIcon, Box, Flex, Text, Title } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton";
import Link from "../ui/Link";

const useItemIsInCart = ({ product }: { product: Product }) => {
  const { cart } = useCart();
  const variant = product.variants[0]!;
  const itemIsInCart = cart?.lines.find(
    (line) => line.merchandise.id === variant.id
  );

  return itemIsInCart;
};

const ProductCard = ({ product }: { product: Product }) => {
  const [, scrollTo] = useWindowScroll();

  const imageUrl = product.featuredImage?.url;
  const imageAlt = product.featuredImage?.altText || product.title;
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
          <Link
            href={`/product/${product.handle}`}
            prefetch
            onClick={() => {
              scrollTo({ y: 0 });
            }}
          >
            <Box
              w="100%"
              pos="relative"
              style={{
                overflow: "hidden",
                aspectRatio: "1/1",
              }}
              bdrs="var(--border-radius)"
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              )}
            </Box>
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
              style={{
                position: "absolute",
                bottom: 5,
                right: 5,
              }}
            />
          )}
        </Box>
        <Link href={`/product/${product.handle}`} prefetch>
          <Title order={5} mb="8" ta="center">
            {title}
          </Title>
          <Text ta="center" c="var(--mantine-color-black)">
            {hasMultiplePrices ? "from " : ""}
            {formattedPrice}
          </Text>
        </Link>
      </Flex>
    </ProductProvider>
  );
};

export default ProductCard;
