import type { FallbackProps } from "react-error-boundary";
import { Button } from "./elements/Button";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="absolute inset-0 z-[-1] grid place-items-center">
      <div className="bg-white py-6 px-10 rounded-2xl grid gap-4 [&>:last-child]:justify-self-center">
        <h2 className="highlighted-text">There was an error!</h2>
        <pre className="text-error">{error.message}</pre>
        <Button variant="error" onClick={() => resetErrorBoundary()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
