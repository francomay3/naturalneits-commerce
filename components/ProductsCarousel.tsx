"use client";

import { Product } from "@/lib/shopify/types";
import ProductCardV2 from "./ProductCardV2";
import Carousel from "./ui/Carousel";

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel options={{ loop: true }} slideWidth={70} gap={15}>
      {products.map((product) => (
        <ProductCardV2 product={product} />
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
