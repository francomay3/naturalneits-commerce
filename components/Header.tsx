"use client";

import IconButton from "@/components/ui/IconButton";
import { Burger } from "@mantine/core";
import { IconSearch, IconShoppingBag } from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";

interface HeaderProps {
  onBurgerClick: () => void;
  navbarOpened: boolean;
  onCartClick: () => void;
}

const Wrapper = styled.header`
  padding-inline: 14px;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  justify-content: space-between;
  background-color: var(--background-color);
`;

const RightIcons = styled.div`
  display: flex;
`;

export default function Header({
  onBurgerClick,
  navbarOpened,
  onCartClick,
}: HeaderProps) {
  return (
    <Wrapper>
      <IconButton
        wrapperAs="div"
        Icon={Burger}
        opened={navbarOpened}
        onClick={onBurgerClick}
        size="20"
        color="var(--brand-color)"
      />
      {/* TODO: unmount the burger button on desktop, because right now its still clickable even if hidden */}
      <Link
        href="/"
        prefetch={true}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <h1>Logo</h1>
      </Link>
      <RightIcons>
        <IconButton Icon={IconSearch} color="var(--brand-color)" />
        <IconButton
          Icon={IconShoppingBag}
          color="var(--brand-color)"
          onClick={onCartClick}
        />
      </RightIcons>
    </Wrapper>
  );
}
