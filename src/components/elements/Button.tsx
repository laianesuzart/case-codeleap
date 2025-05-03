import { clsx } from "clsx";
import type { ComponentProps } from "react";

export type ButtonVariant = "primary" | "outlined" | "success" | "error";

interface Props extends ComponentProps<"button"> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", ...rest }: Props) {
  const baseStyles =
    "font-bold leading-none border-1 border-solid size-fit py-2 px-8 rounded-lg transition-shadow duration-300 not-disabled:cursor-pointer not-disabled:hover:shadow-md disabled:bg-gray-300";
  const customStyles = {
    primary: "bg-primary text-white uppercase",
    outlined: "text-black border-current",
    success: "bg-success text-white",
    error: "bg-error text-white",
  };
  return (
    <button
      type="button"
      className={clsx(baseStyles, customStyles[variant])}
      {...rest}
    />
  );
}
