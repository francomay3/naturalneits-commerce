import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";
import { SimpleGrid } from "@mantine/core";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  // Get all products with default sorting
  const products = await getProducts({
    sortKey: "CREATED_AT",
    reverse: false,
  });

  // Or with search query
  // const products = await getProducts({
  //   query: 'shirt',
  //   sortKey: 'TITLE',
  //   reverse: false
  // });

  return (
    <section>
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
        spacing={{ base: 35 }}
        verticalSpacing={{ base: 65 }}
        p={35}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </section>
  );
}
