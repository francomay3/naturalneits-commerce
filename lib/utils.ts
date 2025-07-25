import { ReadonlyURLSearchParams } from "next/navigation";
import { Cart, Product, ProductVariant } from "./shopify/types";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  const requiredEnvironmentVariables = [
    "SHOPIFY_STORE_DOMAIN",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  ];
  const missingEnvironmentVariables = [] as string[];

  requiredEnvironmentVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingEnvironmentVariables.push(envVar);
    }
  });

  if (missingEnvironmentVariables.length) {
    throw new Error(
      `The following environment variables are missing. Your site will not work without them. Read more: https://vercel.com/docs/integrations/shopify#configure-environment-variables\n\n${missingEnvironmentVariables.join(
        "\n"
      )}\n`
    );
  }

  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them."
    );
  }
};

export const formatPrice = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
};

export const getProductFormattedPrice = (product: Product) =>
  formatPrice(
    product.priceRange.maxVariantPrice.amount,
    product.priceRange.maxVariantPrice.currencyCode
  );

export const getCartSubtotal = (cart: Cart) =>
  formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode);

export const getCheapestAvailableVariant = (
  variants: ProductVariant[]
): ProductVariant | null => {
  return (
    variants
      .filter((variant) => variant.availableForSale)
      .sort((a, b) => Number(a.price.amount) - Number(b.price.amount))[0] ||
    null
  );
};
