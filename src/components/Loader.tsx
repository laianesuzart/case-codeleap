import Spinner from "@/assets/spinner.svg?react";

export function Loader() {
  return (
    <div aria-label="Loading content" className="absolute inset-0 z-50 grid place-items-center bg-[#7695ec6e]">
      <Spinner className="size-20 animate-spin text-white" />
    </div>
  );
}
