import logo from "@/public/logo.webp";
import { Box } from "@mantine/core";

const Logo = ({ size }: { size: number }) => (
  <Box
    w={size}
    h={size}
    bgsz="contain"
    bgp="center"
    bgr="no-repeat"
    style={{
      backgroundImage: `url(${logo.src})`,
    }}
  />
);

export default Logo;
