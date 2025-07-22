import { Flex } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageItem from "./PageItem";

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
