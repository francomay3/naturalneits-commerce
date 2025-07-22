import IconButton from "@/components/ui/IconButton";
import { HEADER_HEIGHT } from "@/lib/constants";
import { Flex } from "@mantine/core";
import { IconMenu, IconX } from "@tabler/icons-react";
import Link from "next/link";
import Logo from "../Logo";
import CartButton from "./CartButton";
import HeaderLinks from "./HeaderLinks";

interface HeaderProps {
  onBurgerClick: () => void;
  navbarOpened: boolean;
  onCartClick: () => void;
  closeSidebars: () => void;
}

export default function Header({
  onBurgerClick,
  navbarOpened,
  onCartClick,
  closeSidebars,
}: HeaderProps) {
  return (
    <Flex
      justify="space-between"
      px="14"
      align="center"
      h="100%"
      pos="relative"
      bg="var(--background-color)"
      style={{
        transition: "opacity 0.2s ease",
      }}
    >
      <IconButton
        Icon={navbarOpened ? IconX : IconMenu}
        onClick={onBurgerClick}
        hiddenFrom="sm"
      />
      <HeaderLinks visibleFrom="sm" />
      <Link
        href="/"
        prefetch={true}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={closeSidebars}
      >
        <Logo size={HEADER_HEIGHT - 10} />
      </Link>
      <Flex>
        {/* TODO: add search support */}
        {/* <IconButton Icon={IconSearch} /> */}
        <CartButton onCartClick={onCartClick} />
      </Flex>
    </Flex>
  );
}
