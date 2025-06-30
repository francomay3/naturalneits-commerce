"use client";

import { Product } from "@/lib/shopify/types";
import ProductCard from "./ProductCard";
import Carousel from "./ui/Carousel";

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel options={{ loop: true }} slideWidth={70} gap={15}>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
