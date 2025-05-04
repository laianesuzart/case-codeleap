import SignOutIcon from "@/assets/signout-icon.svg?react";
import { updateStore } from "@/lib/store";
import { Link, useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSignOut = () => {
    document.cookie = "username=;max-age=0";
    updateStore({ field: "username", value: "" });
    navigate({ to: "/signup", viewTransition: { types: ["slide-left"] } });
  };

  return (
    <header
      className={clsx(
        "py-6 px-10 z-20 bg-primary shadow-md flex justify-between items-center sticky top-0 transition-transform duration-300",
        showHeader ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <h1 className="highlighted-text text-white">
        <Link to="/">CodeLeap Network</Link>
      </h1>
      <button
        type="button"
        title="Sign out"
        onClick={onSignOut}
        className="text-white cursor-pointer hover:opacity-80"
      >
        <SignOutIcon />
      </button>
    </header>
  );
}
