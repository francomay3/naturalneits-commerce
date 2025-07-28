/**
 * Environment variable validation
 * This file validates all required environment variables at startup
 */

interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateEnvVariables(): EnvValidationResult {
  const errors: string[] = [];
  const requiredVars = [
    "SHOPIFY_REVALIDATION_SECRET",
    "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    "SHOPIFY_STORE_DOMAIN",
    "SITE_NAME",
    "TWITTER_CREATOR",
    "TWITTER_SITE",
    "VERCEL_OIDC_TOKEN",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
  ];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      errors.push(`Missing required environment variable: ${varName}`);
    }
  }

  if (process.env.SHOPIFY_STORE_DOMAIN) {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    if (domain.includes("[") || domain.includes("]")) {
      errors.push(
        'SHOPIFY_STORE_DOMAIN should not contain brackets. Please use the actual domain (e.g., "your-store.myshopify.com")'
      );
    }
    if (!domain.includes(".myshopify.com")) {
      errors.push(
        'SHOPIFY_STORE_DOMAIN should be a valid Shopify domain (e.g., "your-store.myshopify.com")'
      );
    }
  }

  if (process.env.SMTP_PORT) {
    const port = parseInt(process.env.SMTP_PORT);
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push("SMTP_PORT must be a valid port number between 1 and 65535");
    }
  }

  if (process.env.SMTP_USER && !process.env.SMTP_USER.includes("@")) {
    errors.push("SMTP_USER should be a valid email address");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

const validation = validateEnvVariables();

if (!validation.isValid) {
  const errorMessage = `Environment variable validation failed:\n${validation.errors.join("\n")}`;
  throw new Error(errorMessage);
}
