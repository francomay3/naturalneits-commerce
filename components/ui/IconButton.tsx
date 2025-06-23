import { css, styled } from "styled-components";

// TODO: add hover and active states

const Wrapper = styled.button.withConfig({
  shouldForwardProp: (prop) => !["outlined", "color"].includes(prop),
})<{ outlined?: boolean; color?: string }>`
  all: unset;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--border-radius);

  ${({ outlined, color }) =>
    outlined &&
    css`
      border-color: ${color};
    `}

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const IconButton = ({
  Icon,
  wrapperAs,
  onClick,
  style,
  outlined,
  color,
  ...props
}: any) => {
  return (
    <Wrapper
      as={wrapperAs}
      onClick={onClick}
      style={style}
      outlined={outlined}
      color={color}
    >
      <Icon size={20} stroke={1.5} color={color} {...props} />
    </Wrapper>
  );
};

export default IconButton;
