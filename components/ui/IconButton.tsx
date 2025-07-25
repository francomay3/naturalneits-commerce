import { ActionIcon, BoxProps } from "@mantine/core";

interface IconButtonProps extends BoxProps {
  Icon: React.ElementType;
  mode?: "primary" | "secondary" | "tertiary";
  variant?: "filled" | "subtle" | "outlined";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  size?: number;
}

type IconColors = {
  wrapperColor: string;
  iconColor: string;
};

type IconVariants = "filled" | "subtle" | "outlined";

const getIconColors = (variant: IconVariants, mode: string): IconColors => {
  let color = "var(--brand-color)";

  if (mode === "secondary") {
    color = "var(--secondary-color)";
  }
  if (mode === "tertiary") {
    color = "var(--tertiary-color)";
  }

  if (variant === "filled") {
    return {
      wrapperColor: color,
      iconColor: "white",
    };
  }
  return {
    wrapperColor: color,
    iconColor: color,
  };
};

const IconButton = ({
  Icon,
  mode = "primary",
  variant = "subtle",
  onClick,
  style,
  type,
  loading,
  disabled,
  size = 20,
  ...boxProps
}: IconButtonProps) => {
  const iconColors = getIconColors(variant, mode);

  // TODO: bugfix: outlined button color are wrong

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
      loading={loading}
      disabled={disabled}
      {...boxProps}
    >
      <Icon
        size={size}
        stroke={1.5}
        color={disabled ? "gray" : iconColors.iconColor}
      />
    </ActionIcon>
  );
};

export default IconButton;
