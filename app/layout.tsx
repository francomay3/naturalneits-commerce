import "@mantine/core/styles.css";
import { CartProvider } from "components/cart/cart-context";
import StyledComponentsRegistry from "lib/registry";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";

import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/footer";
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
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
              <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: "sm" }}
                padding="md"
              >
                <AppShellHeader>
                  <Header />
                </AppShellHeader>

                <AppShellNavbar p="md">
                  <Navbar />
                </AppShellNavbar>

                <AppShellMain>{children}</AppShellMain>
                <AppShellFooter>
                  <Footer />
                </AppShellFooter>
              </AppShell>
            </CartProvider>
          </MantineProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
