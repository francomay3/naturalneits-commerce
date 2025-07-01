import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Thumbnail from "./Thumbnail";

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

const ThumbnailsWrapper = styled.div`
  margin-top: 8px;
  margin-inline: 8px;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function Carousel({
  children,
  options,
  slideWidth,
  gap,
  thumbnails,
  style,
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  slideWidth?: number;
  gap?: number;
  thumbnails?: boolean;
  style?: React.CSSProperties;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbnailsRef, emblaThumbnailsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const childrenArray = React.Children.toArray(children);
  const [wrapperWidth, setWrapperWidth] = React.useState(0);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbnailsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbnailsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbnailsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbnailsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbnailsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  React.useEffect(() => {
    const updateWrapperWidth = () => {
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.offsetWidth);
      }
    };

    // Set initial width
    updateWrapperWidth();

    window.addEventListener("resize", updateWrapperWidth);

    return () => {
      window.removeEventListener("resize", updateWrapperWidth);
    };
  }, []);

  const gapInPixels = gap ? (wrapperWidth * gap) / 100 : 0;
  const slideWidthInPixels = slideWidth ? (wrapperWidth * slideWidth) / 100 : 0;

  return (
    <div style={style}>
      <Wrapper
        ref={(node) => {
          emblaMainRef(node);
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

      {thumbnails && (
        <ThumbnailsWrapper ref={emblaThumbnailsRef}>
          <ThumbnailsContainer>
            {childrenArray.map((child, index) => (
              <Thumbnail
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              >
                {child}
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ThumbnailsWrapper>
      )}
    </div>
  );
}

export default Carousel;
