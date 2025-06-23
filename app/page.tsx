import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
