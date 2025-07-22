"use client";

import { Product } from "@/lib/shopify/types";
import Carousel from "../Carousel/Carousel";
import ProductCard from "./ProductCard";

const ProductsCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel options={{ loop: true }} slideWidth={70} gap={15}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};

export default ProductsCarousel;
