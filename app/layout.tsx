import { CartProvider } from "@/providers/cart-context";
import "@mantine/core/styles.css";
import StyledComponentsRegistry from "lib/registry";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";

import AppShellWrapper from "@/components/AppShellWrapper";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <StyledComponentsRegistry>
          <MantineProvider>
            <CartProvider cartPromise={cart}>
              <AppShellWrapper>{children}</AppShellWrapper>
            </CartProvider>
          </MantineProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
