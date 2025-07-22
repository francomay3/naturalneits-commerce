"use client";

import { Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import Carousel from "../Carousel/Carousel";
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

  const images = srcs.map((src) => (
    <Box
      w="100%"
      h="100%"
      bgsz="cover"
      bgp="center"
      bgr="no-repeat"
      style={{
        aspectRatio: "1/1",
        backgroundImage: `url(${src})`,
      }}
    />
  ));

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    open();
  };

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
          <Box
            h="100%"
            w="100%"
            bgsz="contain"
            bgp="center"
            bgr="no-repeat"
            style={{
              aspectRatio: "1/1",
              backgroundImage: `url(${srcs[selectedIndex]!})`,
            }}
          />
        </Zoom>
      </Modal>
      <Carousel
        className={className}
        options={{ loop: true }}
        slideWidth={100}
        gap={0}
        thumbnails
        style={style}
        onClick={handleClick}
        arrows
      >
        {images}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
