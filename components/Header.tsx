"use client";

import IconButton from "@/components/ui/IconButton";
import { Flex } from "@mantine/core";
import {
  IconMenu,
  IconSearch,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";

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
        <h1>Logo</h1>
      </Link>
      <Flex>
        {/* TODO: add search support */}
        <IconButton Icon={IconSearch} />
        {/* TODO: add a badge to the cart icon with the number of items in the cart */}
        <IconButton Icon={IconShoppingBag} onClick={onCartClick} />
      </Flex>
    </Wrapper>
  );
}
