import React from "react";
import { css, styled } from "styled-components";

const Wrapper = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["primary", "secondary", "outlined"].includes(prop),
})<ButtonProps>`
  all: unset;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 15px;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);

  background-color: var(--brand-color);
  color: var(--background-color);

  ${({ secondary, outlined }) => {
    const primary = !secondary;
    const filled = !outlined;

    if (primary && filled) {
      return css`
        background-color: var(--brand-color);
        color: var(--background-color);

        &:hover {
          background-color: var(--brand-color-lighter);
        }

        &:active {
          background-color: var(--brand-color-darker);
        }
      `;
    }

    if (primary && outlined) {
      return css`
        background-color: var(--background-color);
        color: var(--brand-color);
        border: 1px solid var(--brand-color);

        &:hover {
          background-color: var(--brand-color-lighter);
        }

        &:active {
          background-color: var(--brand-color-darker);
        }
      `;
    }

    if (secondary && filled) {
      return css`
        background-color: var(--secondary-color);
        color: var(--background-color);

        &:hover {
          background-color: var(--secondary-color-lighter);
        }

        &:active {
          background-color: var(--secondary-color-darker);
        }
      `;
    }

    if (secondary && outlined) {
      return css`
        background-color: var(--background-color);
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);

        &:hover {
          background-color: var(--secondary-color-lighter);
        }

        &:active {
          background-color: var(--secondary-color-darker);
        }
      `;
    }
  }}
`;

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  outlined?: boolean;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Button;
