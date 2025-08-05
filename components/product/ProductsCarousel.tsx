"use client";

import { Product } from "@/lib/shopify/types";
import { Carousel } from "@mantine/carousel";
import ProductCard from "./ProductCard";

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel
      slideSize={{
        base: "70%",
        md: "33.333333%",
      }}
      slideGap="md"
    >
      {products.map((product) => (
        <Carousel.Slide key={product.id}>
          <ProductCard product={product} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
