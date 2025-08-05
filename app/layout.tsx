import AppShellWrapper from "@/components/AppShellWrapper";
import { CartProvider } from "@/contexts/CartContext";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
// prettier-ignore
import "@mantine/carousel/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import "./globals.css";

// Import environment validation to ensure all required variables are set
import "lib/env-validation";
import theme from "./theme";

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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <CartProvider cartPromise={cart}>
            <AppShellWrapper>{children}</AppShellWrapper>
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
