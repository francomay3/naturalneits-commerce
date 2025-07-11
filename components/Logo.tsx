import logo from "@/public/logo.webp";
import { styled } from "styled-components";

const Logo = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-image: url(${logo.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export default Logo;
