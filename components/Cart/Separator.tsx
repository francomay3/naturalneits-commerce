import styled from "styled-components";

const Separator = styled.div<{ m?: string }>`
  height: 1px;
  background-color: #c0523a40;
  margin-block: ${({ m }) => m || "15"}px;
`;

export default Separator;
