"use client";

import { Product } from "@/lib/shopify/types";
import { Carousel } from "@mantine/carousel";
import { useViewportSize } from "@mantine/hooks";
import ProductCard from "./ProductCard";

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  const { width } = useViewportSize();
  const count = products.length;

  const isMobile = width < 768;

  let maxCardsOnScreen = isMobile ? 1.3 : 3.3;
  if (count <= maxCardsOnScreen) {
    maxCardsOnScreen = count;
  }

  return (
    <Carousel
      slideSize={`${100 / maxCardsOnScreen}%`}
      slideGap="md"
      withControls={count > maxCardsOnScreen}
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
