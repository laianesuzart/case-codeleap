import { createFileRoute, redirect } from "@tanstack/react-router";

import { useStore } from "../lib/store";

export const Route = createFileRoute("/")({
	beforeLoad: ({ context }) => {
		if (!context.username) {
			throw redirect({
				to: "/signup",
			});
		}
	},
	component: Home,
});

function Home() {
	const username = useStore((state) => state.username);

	return (
		<div className="text-center">
			<h1>{username}</h1>
		</div>
	);
}
