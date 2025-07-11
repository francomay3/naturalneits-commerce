import { Flex } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const PageItem = styled.li<{ active: boolean }>`
  font-size: 18px;
  padding-block: 20px;
  border-bottom: 1px solid var(--brand-color);
  text-transform: uppercase;
  list-style: none;
  font-weight: 600;
  cursor: pointer;
  color: ${({ active }) =>
    active ? "var(--secondary-color)" : "var(--brand-color)"};
  &:hover {
    color: var(--secondary-color);
  }
`;

const PagesList = ({ closeSidebars }: { closeSidebars: () => void }) => {
  const pathname = usePathname();

  return (
    <Flex direction="column" bg="var(--background-color)" w="100%" h="100%">
      <Link href="/about" prefetch onClick={closeSidebars}>
        <PageItem active={pathname === "/about"}>About</PageItem>
      </Link>
      <Link href="/" prefetch onClick={closeSidebars}>
        <PageItem active={pathname === "/"}>Shop</PageItem>
      </Link>
      <Link href="/contact" prefetch onClick={closeSidebars}>
        <PageItem active={pathname === "/contact"}>Contact</PageItem>
      </Link>
    </Flex>
  );
};

export default PagesList;
