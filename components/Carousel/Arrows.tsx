import { ActionIcon, Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { EmblaCarouselType } from "embla-carousel";

const Arrows = ({ emblaMainApi }: { emblaMainApi: EmblaCarouselType }) => (
  <Flex
    pos="absolute"
    top="50%"
    style={{ transform: "translateY(-50%)" }}
    justify="space-between"
    w="100%"
    px="8"
  >
    <ActionIcon variant="filled" onClick={() => emblaMainApi.scrollPrev()}>
      <IconChevronLeft size={20} />
    </ActionIcon>
    <ActionIcon variant="filled" onClick={() => emblaMainApi.scrollNext()}>
      <IconChevronRight size={20} />
    </ActionIcon>
  </Flex>
);

export default Arrows;
