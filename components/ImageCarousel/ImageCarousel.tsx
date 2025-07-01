"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { styled } from "styled-components";
import Carousel from "../Carousel/Carousel";

const Image = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

// TODO: make the modal be more intuitive. picture should be zoomable, take the full width and the background should be dark to highlight the image.
// TODO: add arrows control to the carousel

const ImageCarousel = ({
  srcs,
  style,
}: {
  srcs: string[];
  style?: React.CSSProperties;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = srcs.map((src) => <Image src={src} />);

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
      >
        <Image src={srcs[selectedIndex]!} />
      </Modal>
      <Carousel
        options={{ loop: true }}
        slideWidth={100}
        gap={0}
        thumbnails
        style={style}
        onClick={handleClick}
      >
        {images}
      </Carousel>
    </>
  );
};

export default ImageCarousel;
