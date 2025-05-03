import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="py-6 px-10 bg-primary flex justify-between">
      <h1 className="highlighted-text text-white">
        <Link to="/">CodeLeap Network</Link>
      </h1>
    </header>
  );
}
