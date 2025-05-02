import GithubLogo from "@/assets/github-logo.svg?react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TanstackQueryLayout from "../integrations/tanstack-query/layout";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
	username: string;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<a
				href="https://github.com/laianesuzart"
				target="_blank"
				rel="noreferrer"
				title="Github"
				className="z-10 absolute bottom-4 right-4 p-1 text-[#d1d7e0] bg-[#151b23] rounded-full shadow-md hover:invert transition-discrete duration-300"
			>
				<GithubLogo />
			</a>
			<Outlet />

			<TanStackRouterDevtools />
			<TanstackQueryLayout />
		</>
	),
});
