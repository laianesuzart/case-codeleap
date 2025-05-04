import type { FallbackProps } from "react-error-boundary";
import { Button } from "./elements/Button";

export function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      There was an error!
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button variant="error" onClick={() => resetErrorBoundary()}>
        Try again
      </Button>
    </div>
  );
}
