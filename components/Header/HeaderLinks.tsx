"use client";

import { ROUTES } from "@/lib/constants";
import { BoxProps, Flex } from "@mantine/core";
import Link from "../ui/Link";

const HeaderLinks = (props: BoxProps) => {
  return (
    <Flex {...props} gap="16">
      {Object.values(ROUTES).map((route) => (
        <Link href={route.href} key={route.href} prefetch>
          {route.title}
        </Link>
      ))}
    </Flex>
  );
};

export default HeaderLinks;
