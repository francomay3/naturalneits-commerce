import { ROUTES } from "@/lib/constants";
import { Flex } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "../ui/Link";
import PageItem from "./PageItem";

const PagesList = ({ closeSidebars }: { closeSidebars: () => void }) => {
  const pathname = usePathname();

  return (
    <Flex direction="column" bg="var(--background-color)" w="100%" h="100%">
      {Object.values(ROUTES).map((route) => (
        <Link
          key={route.href}
          href={route.href}
          prefetch
          onClick={closeSidebars}
        >
          <PageItem active={pathname === route.href}>{route.title}</PageItem>
        </Link>
      ))}
    </Flex>
  );
};

export default PagesList;
