import PageHero from "@/components/PageHero";
import { Box, Flex, Text } from "@mantine/core";
import Image from "next/image";
//TODO: replace all images with mantine image with component set to next image

// TODO: Text in about page does not have correct styling

const page = () => {
  return (
    <>
      <PageHero
        title="The story behind every stitch"
        subtitle="Garments made with care in every detail."
        image="/about-image.webp"
      />
      <section>
        <Flex gap="24px">
          <Box visibleFrom="md" style={{ flex: 1 }}>
            <Image
              src="/about-image.webp"
              alt="Girl dress"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "var(--mantine-radius-default)",
              }}
            />
          </Box>
          <Box style={{ flex: 3 }}>
            <Text>
              Hi! I'm Natasha. I sew everything you see here. By hand, at home,
              often with a cup of tea nearby and my little one playing at my
              feet.
            </Text>
            <Text>
              This shop grew out of a quiet dream: to make simple, beautiful
              things that last. Clothes you can wear every day, made from
              natural fabrics. Pieces that feel like home. I take inspiration
              from the countryside around us. The slow days, the changing
              seasons, the way things used to be made.
            </Text>
            <Text>
              Every garment, every stitch, is done with care. No factories, no
              shortcuts. Just me, my sewing machine, and a deep love for the
              craft.
            </Text>
            <Text>
              Thank you for being here. I hope you find something that feels
              just right.
            </Text>
          </Box>
        </Flex>
      </section>
    </>
  );
};

export default page;
