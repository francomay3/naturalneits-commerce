import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";
import React from "react";

interface ButtonProps extends MantineButtonProps {
  children: React.ReactNode;
  secondary?: boolean;
  variant?: "filled" | "outline";
  formAction?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  formAction,
  secondary,
  variant = "filled",
  disabled,
  type,
  ...rest
}: ButtonProps) => {
  const filled = variant === "filled";

  const buttonColor = secondary
    ? "var(--secondary-color)"
    : "var(--brand-color)";
  const textColor = filled ? "var(--background-color)" : buttonColor;

  return (
    <MantineButton
      formAction={formAction}
      type={formAction ? "submit" : type}
      h="44"
      color={!disabled ? buttonColor : undefined}
      styles={{
        label: {
          color: !disabled ? textColor : undefined,
        },
      }}
      disabled={disabled}
      variant={variant}
      radius="var(--border-radius)"
      {...rest}
    >
      {children}
    </MantineButton>
  );
};

export default Button;
