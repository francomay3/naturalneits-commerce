import { getProductRecommendations } from "@/lib/shopify";
import { Flex } from "@mantine/core";
import ProductsCarousel from "./ProductsCarousel";

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <Flex direction="column" gap={16}>
      <h2 style={{ marginInline: 30 }}>Related Products</h2>
      <ProductsCarousel products={relatedProducts} />
    </Flex>
  );
}
