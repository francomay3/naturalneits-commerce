import { Box, Flex } from "@mantine/core";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import Arrows from "./Arrows";
import Thumbnail from "./Thumbnail";

// TODO: replace with mantine carousel

function Carousel({
  children,
  options,
  slideWidth,
  gap,
  thumbnails,
  style,
  onClick,
  arrows,
  className,
}: {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  slideWidth?: number;
  gap?: number;
  thumbnails?: boolean;
  style?: React.CSSProperties;
  onClick?: (index: number) => void;
  arrows?: boolean;
  className?: string;
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
  }, [childrenArray]);

  useEffect(() => {
    if (emblaMainApi) {
      emblaMainApi.reInit();
    }
    if (emblaThumbnailsApi) {
      emblaThumbnailsApi.reInit();
    }
  }, [childrenArray, emblaMainApi, emblaThumbnailsApi]);

  const gapInPixels = gap ? (wrapperWidth * gap) / 100 : 0;
  const slideWidthInPixels = slideWidth ? (wrapperWidth * slideWidth) / 100 : 0;

  return (
    <Box style={style} className={className}>
      <Box
        w="100%"
        pos="relative"
        style={{ overflow: "hidden" }}
        ref={(node) => {
          emblaMainRef(node);
          wrapperRef.current = node;
        }}
      >
        <Flex mx={gapInPixels ? gapInPixels / 2 : 0}>
          {childrenArray.map((child, index) => (
            <Flex
              key={index}
              miw="0"
              flex={`0 0 ${slideWidthInPixels || 100}px`}
              mx={gapInPixels ? gapInPixels / 2 : 0}
              onClick={() => onClick?.(index)}
            >
              {child}
            </Flex>
          ))}
        </Flex>
        {arrows && emblaMainApi && <Arrows emblaMainApi={emblaMainApi} />}
      </Box>

      {thumbnails && (
        <Box mt="8px" mx="8px" ref={emblaThumbnailsRef}>
          <Flex
            gap="0.5rem"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {childrenArray.map((child, index) => (
              <Thumbnail
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              >
                {child}
              </Thumbnail>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default Carousel;
