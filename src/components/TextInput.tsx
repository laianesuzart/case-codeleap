import clsx from "clsx";
import { type ComponentProps, useId } from "react";

type InputProps = ComponentProps<"input">;
type TextareaProps = ComponentProps<"textarea">;

type Props = {
	label: string;
	error?: boolean;
	helperText?: string;
	multiline?: boolean;
} & (InputProps | TextareaProps);

export function TextInput({
	label,
	error,
	helperText,
	multiline = false,
	...rest
}: Props) {
	const inputId = useId();
	const inputStyles = clsx(
		"py-[5px] px-3 border-1 border-solid border-[#777] rounded-lg placeholder:text-sm placeholder:text-[#ccc] leading-tight",
		error && "border-error outline-error",
	);

	return (
		<div className="flex flex-col text-left">
			<label htmlFor={inputId} className="pb-2 leading-tight">
				{label}
			</label>
			{multiline ? (
				<textarea
					id={inputId}
					className={clsx(
						inputStyles,
						"resize-none field-sizing-content min-h-[74px] wrap-anywhere max-h-[30svh]",
					)}
					{...(rest as TextareaProps)}
				/>
			) : (
				<input
					id={inputId}
					className={inputStyles}
					type="text"
					{...(rest as InputProps)}
				/>
			)}
			{helperText ? (
				<p className={clsx("text-xs pt-1", error && "text-error")}>
					{helperText}
				</p>
			) : null}
		</div>
	);
}
