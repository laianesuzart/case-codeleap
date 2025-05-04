import { type ReactNode, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  disableEscapeKeyDown?: boolean;
}
export function Root({
  isOpen,
  children,
  onClose,
  disableEscapeKeyDown = false,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = ref.current;
    if (dialogNode) {
      if (isOpen) dialogNode.showModal();
      else dialogNode.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (disableEscapeKeyDown) {
          e.preventDefault();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [disableEscapeKeyDown, isOpen, onClose]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="backdrop:bg-[#777] backdrop:opacity-80 top-1/2 left-1/2 translate-[-50%] min-w-4/5 md:min-w-auto md:w-[41.25rem] md:min-h-[9.125rem] p-6 grid gap-6 bg-white rounded-2xl"
    >
      {children}
    </dialog>
  );
}
