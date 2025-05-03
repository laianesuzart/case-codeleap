import ErrorImage from "@/assets/not-found-error.svg?react";
import { Header } from "./widgets/Header";

export function NotFound() {
  return (
    <div className="h-dvh bg-white flex flex-col [view-transition-name:main-content]">
      <Header />
      <main className="grow p-8 flex flex-col justify-center items-center gap-6  md:gap-10">
        <h2 className="flex flex-col items-center font-bold text-xl md:text-4xl">
          <span className="text-red-600 text-2xl md:text-6xl self-start">
            404
          </span>
          Page not found
        </h2>

        <ErrorImage className="max-w-[500px] shrink-0" />
      </main>
    </div>
  );
}
