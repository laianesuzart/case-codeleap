import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { NotFound } from "./components/NotFound.tsx";
import { ServerTimeProvider } from "./hooks/ServerTimeContext.tsx";
import { useStore } from "./lib/store.ts";
import reportWebVitals from "./reportWebVitals.ts";

dayjs.extend(relativeTime);
dayjs.extend(utc);
// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    ...TanstackQuery.getContext(),
    username: "",
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const username = useStore((state) => state.username);
  return <RouterProvider router={router} context={{ username }} />;
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <TanstackQuery.Provider>
        <ServerTimeProvider>
          <InnerApp />
          <Toaster
            position="top-right"
            gutter={8}
            toastOptions={{
              duration: 3000,
              removeDelay: 1000,
              error: {
                style: {
                  color: "#ff5151",
                },
              },
            }}
          />
        </ServerTimeProvider>
      </TanstackQuery.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
