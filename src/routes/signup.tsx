import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { updateStore } from "@/lib/store";
import { useAppForm } from "../hooks/form";

export const Route = createFileRoute("/signup")({
	component: Signup,
});

const schema = z.object({
	username: z
		.string()
		.min(3, "At least 3 characters")
		.max(32, "Max 32 characters")
		.regex(
			/^[a-zA-Z0-9._]+$/,
			"Only letters, numbers, underscores, and dots allowed",
		),
});

function Signup() {
	const navigate = useNavigate({ from: "/signup" });

	const form = useAppForm({
		defaultValues: {
			username: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			document.cookie = `username=${value.username}`;
			updateStore({ field: "username", value: value.username });
			navigate({ to: "/" });
		},
	});

	return (
		<div className="min-h-lvh grid place-content-center">
			<div className="bg-white rounded-2xl p-6 md:w-[31.25rem] shadow-lg">
				<h1 className="highlighted-text">Welcome to CodeLeap network!</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="mt-6 flex flex-col gap-4 [&>:last-child]:self-end"
				>
					<form.AppField name="username">
						{(field) => (
							<field.TextField
								label="Please enter your username"
								placeholder="Johndoe"
							/>
						)}
					</form.AppField>
					<form.AppForm>
						<form.SubscribeButton label="Enter" />
					</form.AppForm>
				</form>
			</div>
		</div>
	);
}
