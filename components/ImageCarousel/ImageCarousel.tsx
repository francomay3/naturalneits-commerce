"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { styled } from "styled-components";
import Carousel from "../Carousel/Carousel";
import Zoom from "../Zoom";

const Image = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

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
          <Image src={srcs[selectedIndex]!} />
        </Zoom>
      </Modal>
      <Carousel
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
