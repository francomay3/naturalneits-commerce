import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { EmblaCarouselType } from "embla-carousel";
import styled from "styled-components";
import IconButton from "../ui/IconButton";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-inline: 8px;
`;

const Arrows = ({ emblaMainApi }: { emblaMainApi: EmblaCarouselType }) => {
  const next = () => {
    emblaMainApi.scrollNext();
  };
  const previous = () => {
    emblaMainApi.scrollPrev();
  };
  return (
    <Wrapper>
      <IconButton Icon={IconChevronLeft} variant="filled" onClick={previous} />
      <IconButton Icon={IconChevronRight} variant="filled" onClick={next} />
    </Wrapper>
  );
};

export default Arrows;
