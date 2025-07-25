import logo from "@/public/logo.webp";
import { Box } from "@mantine/core";
import Image from "next/image";

const Logo = ({ size }: { size: number }) => (
  <Box w={size} h={size} pos="relative">
    <Image
      src={logo}
      alt="Naturalneits Logo"
      fill
      sizes={`${size}px`}
      style={{ objectFit: "contain" }}
      priority
    />
  </Box>
);

export default Logo;
