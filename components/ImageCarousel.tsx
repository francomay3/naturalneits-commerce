"use client";

import { styled } from "styled-components";
import Carousel from "./Carousel/Carousel";

const Image = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

// TODO: when clicking on the image, it should open a modal with the image
// TODO: add arrows control to the carousel

const ImageCarousel = ({
  srcs,
  style,
}: {
  srcs: string[];
  style?: React.CSSProperties;
}) => {
  const images = srcs.map((src) => <Image src={src} />);

  return (
    <Carousel
      options={{ loop: true }}
      slideWidth={100}
      gap={0}
      thumbnails
      style={style}
    >
      {images}
    </Carousel>
  );
};

export default ImageCarousel;
