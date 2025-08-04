import type Link from "next/link";
import type { ComponentProps } from "react";

declare module "@mantine/core" {
  interface AnchorProps extends ComponentProps<typeof Link> {
    // This ensures the interface has at least one member to satisfy the linter
    _nextLinkProps?: boolean;
  }
}
