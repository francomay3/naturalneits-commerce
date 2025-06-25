import { getProductFormattedPrice } from "@/lib/utils";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import AddToCartButton from "../AddToCartButton";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const formattedPrice = getProductFormattedPrice(product);

  return (
    <>
      <div>
        <h1>{product.title}</h1>
        <div>
          <p suppressHydrationWarning={true}>{formattedPrice}</p>
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml && <Prose html={product.descriptionHtml} />}
      <AddToCartButton product={product} />
    </>
  );
}
