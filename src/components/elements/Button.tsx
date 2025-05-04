import { clsx } from "clsx";
import type { ComponentProps } from "react";
import Spinner from "@/assets/spinner.svg?react";

export type ButtonVariant = "primary" | "outlined" | "success" | "error";

interface Props extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  ...rest
}: Props) {
  const baseStyles =
    "grid [grid-template-areas:'content'] place-items-center font-bold leading-none border-1 border-solid size-fit py-2 px-8 rounded-lg transition-shadow duration-300 not-disabled:cursor-pointer not-disabled:hover:shadow-md disabled:bg-gray-300";
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
    >
      <span
        aria-label="Loading"
        className={clsx("invisible [grid-area:content]", loading && "visible")}
      >
        <Spinner className="animate-spin" />
      </span>
      <span className={clsx("[grid-area:content]", loading && "invisible")}>
        {children}
      </span>
    </button>
  );
}
