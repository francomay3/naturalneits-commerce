import AppShellWrapper from "@/components/AppShellWrapper";
import { CartProvider } from "@/contexts/CartContext";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Gilda_Display, Karla } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

// Import environment validation to ensure all required variables are set
import "lib/env-validation";

// TODO: there is no 404 page. create one.
// TODO: I think that when there is an API error and we get the "Oh no! There was an issue with our storefront..." message, the broken page still gets cached. I need to fix this.

const { SITE_NAME } = process.env;

// Initialize Google Fonts
const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-texts",
  style: ["normal"],
  weight: ["400"],
  fallback: ["sans-serif"],
});

const gildaDisplay = Gilda_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-titles",
  weight: "400",
});

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
    <html
      lang="en"
      {...mantineHtmlProps}
      className={`${karla.variable} ${gildaDisplay.variable}`}
    >
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1"
        />
      </head>
      <body className={`${karla.className} ${gildaDisplay.className}`}>
        <MantineProvider>
          <Notifications />
          <CartProvider cartPromise={cart}>
            <AppShellWrapper>{children}</AppShellWrapper>
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
