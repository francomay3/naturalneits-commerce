import { Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { EmblaCarouselType } from "embla-carousel";
import IconButton from "../ui/IconButton";

const Arrows = ({ emblaMainApi }: { emblaMainApi: EmblaCarouselType }) => (
  <Flex
    pos="absolute"
    top="50%"
    style={{ transform: "translateY(-50%)" }}
    justify="space-between"
    w="100%"
    px="8"
  >
    <IconButton
      Icon={IconChevronLeft}
      variant="filled"
      onClick={() => emblaMainApi.scrollPrev()}
    />
    <IconButton
      Icon={IconChevronRight}
      variant="filled"
      onClick={() => emblaMainApi.scrollNext()}
    />
  </Flex>
);

export default Arrows;
