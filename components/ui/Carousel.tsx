import { Flex } from "@mantine/core";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

function Carousel({ children }: { children: React.ReactNode }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <Wrapper ref={emblaRef}>
      <Flex>
        {React.Children.map(children, (child) => (
          <SlideWrapper>{child}</SlideWrapper>
        ))}
      </Flex>
    </Wrapper>
  );
}

export default Carousel;
