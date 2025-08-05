"use client";

import theme from "@/app/theme";
import { Carousel } from "@mantine/carousel";
import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import Zoom from "../Zoom";

const ImageCarousel = ({
  srcs,
  style,
  className,
}: {
  srcs: string[];
  style?: React.CSSProperties;
  className?: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset to first image when srcs change (new product)
  useEffect(() => {
    setSelectedIndex(0);
  }, [srcs]);

  const images = srcs.map((src, index) => (
    <Carousel.Slide
      key={src}
      w="100%"
      h="100%"
      pos="relative"
      style={{
        aspectRatio: "1/1",
      }}
      onClick={() => handleClick(index)}
    >
      <Image
        src={src}
        alt={`Product image ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        priority={index === 0}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </Carousel.Slide>
  ));

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    open();
  };

  console.log(theme);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Image Preview"
        fullScreen
        radius={0}
        styles={{
          body: {
            padding: 0,
            height: "100%",
          },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          header: {
            backgroundColor: "transparent",
          },
          close: {
            // TODO: bugfix: close button color on hover is weird
            color: "white",
          },
          title: {
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "var(--font-family-texts)",
          },
        }}
      >
        <Zoom>
          <Box h="100%" w="100%" pos="relative">
            <Image
              src={srcs[selectedIndex]!}
              alt={`Product image ${selectedIndex + 1} - Full view`}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        </Zoom>
      </Modal>
      <Carousel
        style={style}
        className={className}
        withIndicators={srcs.length > 1}
        withControls={srcs.length > 1}
        styles={{
          ...(theme.components?.Carousel?.defaultProps?.styles || {}),
          root: {
            ...(theme.components?.Carousel?.defaultProps?.styles?.root || {}),
            maxWidth: "600px",
            justifySelf: "center",
            width: "100%",
            aspectRatio: "1",
          },
        }}
      >
        {images}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
