import IconButton from "@/components/ui/IconButton";
import { HEADER_HEIGHT } from "@/lib/constants";
import { Flex } from "@mantine/core";
import { IconMenu, IconX } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "../Logo";
import CartButton from "./CartButton";

interface HeaderProps {
  onBurgerClick: () => void;
  navbarOpened: boolean;
  onCartClick: () => void;
  closeSidebars: () => void;
}

const Wrapper = styled.header`
  padding-inline: 14px;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  justify-content: space-between;
  background-color: var(--background-color);
  transition: opacity 0.2s ease;
`;

export default function Header({
  onBurgerClick,
  navbarOpened,
  onCartClick,
  closeSidebars,
}: HeaderProps) {
  return (
    <Wrapper>
      <IconButton
        Icon={navbarOpened ? IconX : IconMenu}
        onClick={onBurgerClick}
      />
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
    </Wrapper>
  );
}
