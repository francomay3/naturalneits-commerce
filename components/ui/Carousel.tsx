import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const config = {
  shouldForwardProp: (prop: string) =>
    prop !== "slideWidth" && prop !== "gapPixels",
};

const Container = styled.div.withConfig(config)<{ gapPixels: number }>`
  display: flex;
  margin-inline: ${({ gapPixels }) => (gapPixels ? gapPixels / 2 : 0)}px;
`;

const SlideWrapper = styled.div.withConfig(config)<{
  slideWidth?: number;
  gapPixels?: number;
}>`
  flex: 0 0 ${({ slideWidth }) => slideWidth || 100}px;
  min-width: 0;
  margin-inline: ${({ gapPixels }) => (gapPixels ? gapPixels / 2 : 0)}px;
`;

function Carousel({
  children,
  options,
  slideWidth,
  gap,
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  slideWidth?: number;
  gap?: number;
}) {
  const [emblaRef] = useEmblaCarousel(options);
  const childrenArray = React.Children.toArray(children);
  const [wrapperWidth, setWrapperWidth] = React.useState(0);

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
  }, []);

  const gapInPixels = gap ? (wrapperWidth * gap) / 100 : 0;
  const slideWidthInPixels = slideWidth ? (wrapperWidth * slideWidth) / 100 : 0;

  return (
    <Wrapper
      ref={(node) => {
        emblaRef(node);
        wrapperRef.current = node;
      }}
    >
      <Container gapPixels={gapInPixels}>
        {childrenArray.map((child, index) => (
          <SlideWrapper
            key={index}
            slideWidth={slideWidthInPixels}
            gapPixels={gapInPixels}
          >
            {child}
          </SlideWrapper>
        ))}
      </Container>
    </Wrapper>
  );
}

export default Carousel;
