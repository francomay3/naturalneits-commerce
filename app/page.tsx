import PageHero from "@/components/PageHero";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/shopify";
import { SimpleGrid } from "@mantine/core";
import "lib/env-validation";

// TODO: i lost the smtp password. then i created a new one. test if it works!!

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  // Get all products with default sorting
  const products = await getProducts();

  // Or with search query
  // const products = await getProducts({
  //   query: 'shirt',
  //   sortKey: 'TITLE',
  //   reverse: false
  // });

  return (
    <>
      <PageHero
        title="Shop"
        subtitle="Handmade clothing, authentic design, and quality you can feel."
        image="/about-image.webp"
      />
      <section>
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}
          spacing={{ base: 35 }}
          verticalSpacing={{ base: 65 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </section>
    </>
  );
}
