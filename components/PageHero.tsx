import { HEADER_HEIGHT } from "@/lib/constants";
import { Box, Overlay, Text, Title } from "@mantine/core";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}

const HEIGHT = "250px";

const PageHero = ({ title, subtitle, image }: PageHeroProps) => {
  return (
    <>
      <Box
        pos="absolute"
        color="#000"
        left="0"
        top={HEADER_HEIGHT}
        w="100vw"
        mb="lg"
        h={HEIGHT}
      >
        <Image
          src={image}
          alt="Hero background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Overlay
          color="var(--mantine-color-brand-9)"
          backgroundOpacity={0.5}
          blur={5}
          pe="30"
          ps="30"
          style={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title ta="center" mb="lg" c="var(--mantine-color-brand-1)">
            {title}
          </Title>
          <Text ta="center" c="var(--mantine-color-brand-2)">
            {subtitle}
          </Text>
        </Overlay>
      </Box>
      <Box h={HEIGHT} />
    </>
  );
};

export default PageHero;
