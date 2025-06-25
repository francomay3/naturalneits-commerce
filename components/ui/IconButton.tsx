import { ActionIcon } from "@mantine/core";
import { IconLoader2 } from "@tabler/icons-react";
import { useMemo } from "react";

interface IconButtonProps {
  Icon: React.ElementType;
  mode?: "primary" | "secondary" | "tertiary";
  variant?: "filled" | "subtle" | "outlined";
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

type IconColors = {
  wrapperColor: string;
  iconColor: string;
  disabledColor: string;
};

type IconVariants = "filled" | "subtle" | "outlined";

const getPrimaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--brand-color)",
      iconColor: "white",
      disabledColor: "var(--brand-color-lighter)",
    };
  }
  return {
    wrapperColor: "var(--brand-color)",
    iconColor: "var(--brand-color)",
    disabledColor: "var(--brand-color-lighter)",
  };
};

const getSecondaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--secondary-color)",
      iconColor: "white",
      disabledColor: "var(--secondary-color-lighter)",
    };
  }
  return {
    wrapperColor: "var(--secondary-color)",
    iconColor: "var(--secondary-color)",
    disabledColor: "var(--secondary-color-lighter)",
  };
};

const getTertiaryVariants = (variant: IconVariants): IconColors => {
  if (variant === "filled") {
    return {
      wrapperColor: "var(--tertiary-color)",
      iconColor: "white",
      disabledColor: "var(--tertiary-color-lighter)",
    };
  }
  return {
    wrapperColor: "var(--tertiary-color)",
    iconColor: "var(--tertiary-color)",
    disabledColor: "var(--tertiary-color-lighter)",
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
  loading,
}: IconButtonProps) => {
  const iconColors = useMemo(
    () => getIconColors(variant, mode),
    [variant, mode]
  );

  return (
    <ActionIcon
      type={type}
      autoContrast
      size={44}
      radius="var(--border-radius)"
      color={loading ? iconColors.disabledColor : iconColors.wrapperColor}
      variant={variant}
      onClick={onClick}
      style={{
        pointerEvents: loading ? "none" : "auto",
        cursor: loading ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {loading ? (
        <IconLoader2
          size={20}
          stroke={1.5}
          color={iconColors.iconColor}
          style={{
            animation: "spin 1s linear infinite",
          }}
        />
      ) : (
        <Icon size={20} stroke={1.5} color={iconColors.iconColor} />
      )}
    </ActionIcon>
  );
};

export default IconButton;
