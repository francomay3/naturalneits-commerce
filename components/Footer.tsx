import { BORDER_COLOR } from "@/lib/constants";
import { ActionIcon, Box, Flex } from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import Logo from "./Logo";
import Separator from "./Separator";
import Link from "./ui/Link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Flex
      component="footer"
      bg="var(--mantine-color-neutral-1)"
      direction="column"
      align="center"
      justify="center"
      gap="10"
      p="20"
      mt="auto"
      style={{
        borderTop: `1px solid ${BORDER_COLOR}`,
      }}
    >
      <Logo size={100} />
      <Separator m="8" />
      <Box>© {currentYear}, Bruna A.B.</Box>
      <Flex align="center">
        Web development by Franco May
        <Link href="https://www.linkedin.com/in/francomay/" target="_blank">
          <ActionIcon variant="subtle">
            <IconBrandLinkedinFilled size={32} />
          </ActionIcon>
        </Link>
        <Link href="https://github.com/francomay3/" target="_blank">
          <ActionIcon variant="subtle">
            <IconBrandGithubFilled size={32} />
          </ActionIcon>
        </Link>
      </Flex>
      <Box>
        <Link
          href="https://github.com/francomay3/naturalneits-commerce"
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          Check out this project&apos;s code <IconExternalLink />
        </Link>
      </Box>
    </Flex>
  );
}
