import { styled } from "styled-components";

const Wrapper = styled.button`
  all: unset;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconButton = ({ Icon, wrapperAs, onClick, style, ...props }: any) => {
  return (
    <Wrapper as={wrapperAs} onClick={onClick} style={style}>
      <Icon size={20} stroke={1.5} {...props} />
    </Wrapper>
  );
};

export default IconButton;
