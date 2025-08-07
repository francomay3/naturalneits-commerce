import { HEADER_HEIGHT } from "@/lib/constants";
import { ActionIcon, Flex } from "@mantine/core";
import { IconMenu, IconX } from "@tabler/icons-react";
import Logo from "../Logo";
import Link from "../ui/Link";
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
      bg="var(--mantine-color-neutral-1)"
      style={{
        transition: "opacity 0.2s ease",
      }}
    >
      {/* TODO: this could be replaced with burger button from mantine */}
      <ActionIcon variant="subtle" onClick={onBurgerClick} hiddenFrom="sm">
        {navbarOpened ? <IconX size={20} /> : <IconMenu size={20} />}
      </ActionIcon>
      <HeaderLinks visibleFrom="sm" />
      <Link
        href="/"
        prefetch
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
        <CartButton onCartClick={onCartClick} />
      </Flex>
    </Flex>
  );
}
