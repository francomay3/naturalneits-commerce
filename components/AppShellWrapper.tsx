"use client";

import { BORDER_COLOR, HEADER_HEIGHT } from "@/lib/constants";
import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Container,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { useEffect } from "react";
import Cart from "./Cart/Cart";
import Footer from "./Footer";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";

interface AppShellWrapperProps {
  children: React.ReactNode;
}

export default function AppShellWrapper({ children }: AppShellWrapperProps) {
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] =
    useDisclosure();
  const [cartOpened, { toggle: toggleCart, close: closeCart }] =
    useDisclosure();
  const closeSidebars = () => {
    closeNavbar();
    closeCart();
  };
  const showHeader = useHeadroom({ fixedAt: 120 });
  const mainFrozen = navbarOpened || cartOpened;

  useEffect(() => {
    if (cartOpened) {
      closeNavbar();
    }
  }, [cartOpened]);

  useEffect(() => {
    if (navbarOpened) {
      closeCart();
    }
  }, [navbarOpened]);

  return (
    <AppShell
      styles={{
        header: {
          borderColor: BORDER_COLOR,
          transition: "opacity 0.2s ease",
          opacity: showHeader ? 1 : 0,
          pointerEvents: showHeader ? "auto" : "none",
        },
        navbar: {
          borderColor: BORDER_COLOR,
        },
        aside: {
          borderColor: BORDER_COLOR,
        },
        main: {
          backgroundColor: "var(--background-color-lighter)",
          pointerEvents: mainFrozen ? "none" : "auto",
          overflow: mainFrozen ? "hidden" : "initial",
          height: mainFrozen ? "100vh" : "auto",
        },
      }}
      header={{
        height: HEADER_HEIGHT,
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened, desktop: !navbarOpened },
      }}
      aside={{
        width: 470,
        breakpoint: "sm",
        collapsed: { mobile: !cartOpened, desktop: !cartOpened },
      }}
    >
      <AppShellHeader>
        <Header
          onBurgerClick={toggleNavbar}
          navbarOpened={navbarOpened}
          onCartClick={toggleCart}
          closeSidebars={closeSidebars}
        />
      </AppShellHeader>

      <AppShellNavbar>
        <Navbar toggleNavbar={toggleNavbar} />
      </AppShellNavbar>

      <AppShellAside>
        <Cart toggleCart={toggleCart} />
      </AppShellAside>

      <AppShellMain>
        <Container>{children}</Container>
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
