"use client";

import { Product } from "@/lib/shopify/types";
import Image from "next/image";
import styled from "styled-components";
import Carousel from "./ui/Carousel";

const Wrapper = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

const Slide = ({ product }: { product: Product }) => {
  const src = product.images[0]?.url;
  if (!src) return null;
  return (
    <Wrapper>
      <Image src={src} alt={product.title} width={200} height={200} />
      <h3>{product.title}</h3>
      <p>{product.priceRange.maxVariantPrice.amount}</p>
    </Wrapper>
  );
};

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel>
      {products.map((product) => (
        <Slide key={product.id} product={product} />
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
