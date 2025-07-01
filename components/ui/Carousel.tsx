import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
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

// Thumbnail styles
const ThumbsWrapper = styled.div`
  margin-top: 8px;
  margin-inline: 8px;
`;

const ThumbsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ThumbButton = styled.div<{ selected: boolean }>`
  flex: 0 0 60px;
  height: 60px;
  border: 2px solid
    ${({ selected }) => (selected ? "var(--brand-color)" : "transparent")};
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ selected }) =>
      selected ? "var(--color-primary)" : "transparent"};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumb: React.FC<{
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}> = ({ onClick, selected, children }) => {
  return (
    <ThumbButton selected={selected} onClick={onClick}>
      {children}
    </ThumbButton>
  );
};

function Carousel({
  children,
  options,
  slideWidth,
  gap,
  thumbs,
  style,
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  slideWidth?: number;
  gap?: number;
  thumbs?: boolean;
  style?: React.CSSProperties;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const childrenArray = React.Children.toArray(children);
  const [wrapperWidth, setWrapperWidth] = React.useState(0);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

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

    // Add resize listener
    window.addEventListener("resize", updateWrapperWidth);

    // Cleanup
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

      {thumbs && (
        <ThumbsWrapper ref={emblaThumbsRef}>
          <ThumbsContainer>
            {childrenArray.map((child, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              >
                {child}
              </Thumb>
            ))}
          </ThumbsContainer>
        </ThumbsWrapper>
      )}
    </div>
  );
}

export default Carousel;
