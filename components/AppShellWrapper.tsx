"use client";

import {
  AppShell,
  AppShellAside,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Cart from "./Cart/Cart";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar/Navbar";

interface AppShellWrapperProps {
  children: React.ReactNode;
}

export default function AppShellWrapper({ children }: AppShellWrapperProps) {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const [cartOpened, { toggle: toggleCart }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened, desktop: true },
      }}
      aside={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !cartOpened, desktop: !cartOpened },
      }}
    >
      <AppShellHeader>
        <Header
          onBurgerClick={toggleNavbar}
          navbarOpened={navbarOpened}
          onCartClick={toggleCart}
        />
      </AppShellHeader>

      <AppShellNavbar>
        <Navbar toggleNavbar={toggleNavbar} />
      </AppShellNavbar>

      <AppShellAside>
        <Cart toggleCart={toggleCart} />
      </AppShellAside>

      <AppShellMain>
        <div>{children}</div>
        <Footer />
      </AppShellMain>
    </AppShell>
  );
}
