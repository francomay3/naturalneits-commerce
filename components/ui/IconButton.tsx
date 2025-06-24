import { ActionIcon } from "@mantine/core";
// import { css, styled } from "styled-components";

// TODO: add hover and active states

// const Wrapper = styled.button.withConfig({
//   shouldForwardProp: (prop) => !["outlined", "color"].includes(prop),
// })<{ outlined?: boolean; color?: string }>`
//   all: unset;
//   width: 44px;
//   height: 44px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border: 1px solid transparent;
//   border-radius: var(--border-radius);

//   ${({ outlined, color }) =>
//     outlined &&
//     css`
//       border-color: ${color};
//     `}

//   &:hover {
//     opacity: 0.8;
//   }

//   &:active {
//     opacity: 0.6;
//   }
// `;

// const IconButton = ({
//   Icon,
//   wrapperAs,
//   onClick,
//   style,
//   outlined,
//   color,
//   ...props
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }: any) => {
//   return (
//     <Wrapper
//       as={wrapperAs}
//       onClick={onClick}
//       style={style}
//       outlined={outlined}
//       color={color}
//     >
//       <Icon size={20} stroke={1.5} color={color} {...props} />
//     </Wrapper>
//   );
// };

interface IconButtonProps {
  Icon: React.ElementType;
  mode?: "primary" | "secondary" | "tertiary";
  variant?: "filled" | "subtle" | "outlined";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

type IconColors = {
  wrapperColor: string;
  iconColor: string;
};

type IconVariants = "filled" | "subtle" | "outlined";

const getPrimaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--brand-color)",
      iconColor: "white",
    };
  }
  return {
    wrapperColor: "var(--brand-color)",
    iconColor: "var(--brand-color)",
  };
};

const getSecondaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--secondary-color)",
      iconColor: "white",
    };
  }
  return {
    wrapperColor: "var(--secondary-color)",
    iconColor: "var(--secondary-color)",
  };
};

const getTertiaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--tertiary-color)",
      iconColor: "white",
    };
  }
  return {
    wrapperColor: "var(--tertiary-color)",
    iconColor: "var(--tertiary-color)",
  };
};

const getIconColors = (variant: IconVariants, color: string): IconColors => {
  if (color === "primary") {
    return getPrimaryVariants(variant);
  }
  if (color === "secondary") {
    return getSecondaryVariants(variant);
  }
  if (color === "tertiary") {
    return getTertiaryVariants(variant);
  }
  return getPrimaryVariants(variant);
};

const IconButton = ({
  Icon,
  mode = "primary",
  variant = "subtle",
  onClick,
  style,
  type,
}: IconButtonProps) => {
  const iconColors = getIconColors(variant, mode);

  return (
    <ActionIcon
      type={type}
      autoContrast
      size={44}
      radius="var(--border-radius)"
      color={iconColors.wrapperColor}
      variant={variant}
      onClick={onClick}
      style={style}
    >
      <Icon size={20} stroke={1.5} color={iconColors.iconColor} />
    </ActionIcon>
  );
};

export default IconButton;
