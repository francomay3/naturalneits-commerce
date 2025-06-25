"use client";

import { styled } from "styled-components";
import Carousel from "./ui/Carousel";

const Image = styled.div<{ src: string }>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

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
      thumbs
      style={style}
    >
      {images}
    </Carousel>
  );
};

export default ImageCarousel;
