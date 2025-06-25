import { ActionIcon } from "@mantine/core";

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
