import Footer from "@/components/layout/footer";
import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
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
    <html lang="en" className={GeistSans.variable}>
      <body className="flex h-screen flex-col">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main className="flex flex-col gap-4 py-4 flex-1">
            {children}
            {/* <WelcomeToast /> example of a toast */}
          </main>
          <Footer />
        </CartProvider>
        <Toaster closeButton />
      </body>
    </html>
  );
}
