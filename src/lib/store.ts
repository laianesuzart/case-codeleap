import { useStore as useTanstackStore } from "@tanstack/react-store";
import { Effect, Store } from "@tanstack/store";

const store = new Store({
	username: "",
});

type StoreState = (typeof store)["state"];

export const useStore = <T>(selector: (state: StoreState) => T): T => {
	return useTanstackStore(store, selector);
};

export const updateStore = <K extends keyof StoreState>(params: {
	field: K;
	value: StoreState[K];
}) => {
	store.setState((state) => ({
		...state,
		[params.field]: params.value,
	}));
};

const effect = new Effect({
	fn: () => {
		const username = decodeURIComponent(document.cookie)
			.split(";")
			.find((item) => item.startsWith("username="))
			?.slice(9);
		if (username) updateStore({ field: "username", value: username });
	},
	deps: [store],
	eager: true,
});

const unmount = effect.mount();
unmount();
