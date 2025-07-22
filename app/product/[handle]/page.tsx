import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { VariantSelector } from "@/components/product/VariantSelector/VariantSelector";
import { ProductProvider } from "@/contexts/ProductContext";
import { Image } from "@/lib/shopify/types";
import { Box, Title } from "@mantine/core";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./style.module.css";

// TODO: add support for color variants

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider product={product}>
      <Box display="grid" className={styles.productPage} component="section">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
        />

        <Box className={styles.carousel}>
          <ImageCarousel
            srcs={product.images.map((image: Image) => image.url)}
          />
        </Box>

        <Box className={styles.description}>
          <Title order={1} mb="18">
            {product.title}
          </Title>
          {product.descriptionHtml && (
            <Box
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </Box>
        <Box className={styles.variantSelector}>
          <VariantSelector />
        </Box>
        <Box className={styles.relatedProducts}>
          <RelatedProducts id={product.id} />
        </Box>
      </Box>
    </ProductProvider>
  );
}
