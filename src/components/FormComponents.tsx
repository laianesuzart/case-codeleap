import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "../hooks/form-context";
import { Button, type ButtonVariant } from "./Button";
import { TextInput } from "./TextInput";

export function SubscribeButton({
	label,
	variant,
}: { label: string; variant?: ButtonVariant }) {
	const form = useFormContext();
	return (
		<form.Subscribe
			selector={(state) => ({
				values: state.values,
				isSubmitting: state.isSubmitting,
			})}
		>
			{({ values, isSubmitting }) => {
				const hasEmptyFields = Object.values(values).some((value) => !value);
				return (
					<Button
						type="submit"
						disabled={hasEmptyFields || isSubmitting}
						variant={variant}
					>
						{label}
					</Button>
				);
			}}
		</form.Subscribe>
	);
}

export function TextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<TextInput
			label={label}
			value={field.state.value}
			placeholder={placeholder}
			onBlur={field.handleBlur}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				field.handleChange(e.target.value);
			}}
			error={field.state.meta.isTouched && Boolean(errors.length)}
			helperText={field.state.meta.isTouched ? errors[0]?.message : ""}
		/>
	);
}

export function TextArea({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<TextInput
			multiline
			label={label}
			value={field.state.value}
			placeholder={placeholder}
			onBlur={field.handleBlur}
			onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
				field.handleChange(e.target.value)
			}
			error={field.state.meta.isTouched && Boolean(errors.length)}
			helperText={field.state.meta.isTouched ? errors[0]?.message : ""}
		/>
	);
}
