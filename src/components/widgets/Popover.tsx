import clsx from "clsx";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

const Popover = ({ children, content, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (!(e.target instanceof Node)) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={clsx("relative inline-block", className)}>
      <button
        type="button"
        aria-label="Open actions menu"
        aria-controls="actions-menu"
        ref={buttonRef}
        onClick={togglePopover}
        className="cursor-pointer hover:opacity-80"
      >
        {children}
      </button>
      {isOpen && (
        <div
          id="actions-menu"
          ref={popoverRef}
          className="absolute z-10 w-max bg-white border rounded shadow-md right-0 top-12"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
