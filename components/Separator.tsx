import styled from "styled-components";

const config = {
  shouldForwardProp: (prop: string) =>
    prop !== "slideWidth" && prop !== "gapPixels",
};

const Separator = styled.div.withConfig(config)<{ m?: string }>`
  height: 1px;
  background-color: #c0523a40;
  margin-block: ${({ m }) => m || "20"}px;
  width: 100%;
`;

export default Separator;
