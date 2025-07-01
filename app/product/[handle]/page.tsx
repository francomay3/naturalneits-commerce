import { AddToCartButton } from "@/components/AddToCartButton";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { VariantSelector } from "@/components/product/VariantSelector/VariantSelector";
import { Image } from "@/lib/shopify/types";
import { getProductFormattedPrice } from "@/lib/utils";
import { ProductProvider } from "@/providers/product-context";
import { Box, Flex } from "@mantine/core";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

  const formattedPrice = getProductFormattedPrice(product);

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
    <ProductProvider>
      <Flex direction="column" gap={16} my="30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
        />

        <ImageCarousel srcs={product.images.map((image: Image) => image.url)} />

        <Box p="30" pb="0" mb="60">
          <h1 style={{ marginBottom: "18px" }}>{product.title}</h1>
          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            {formattedPrice}
          </p>
          {product.descriptionHtml && (
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
          <VariantSelector
            options={product.options}
            variants={product.variants}
          />
          {/* TODO: if clicking multiple times, the previous fetches should be cancelled */}
          {/* TODO: this button is not intuitive at all. fix the design. how should the add to cart UI look like? */}
          <AddToCartButton product={product} />
        </Box>
        <RelatedProducts id={product.id} />
      </Flex>
    </ProductProvider>
  );
}
