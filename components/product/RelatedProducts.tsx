import { getProductRecommendations } from "@/lib/shopify";
import { BoxProps, Flex, Title } from "@mantine/core";
import ProductsCarousel from "./ProductsCarousel";

export async function RelatedProducts({
  id,
  ...boxProps
}: BoxProps & { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <Flex direction="column" gap={16} component="section" {...boxProps}>
      <Title order={2} mx={{ base: 14, md: 30 }}>
        Related Products
      </Title>
      <ProductsCarousel products={relatedProducts} />
    </Flex>
  );
}
