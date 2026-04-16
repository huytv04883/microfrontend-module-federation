import { UserButton } from "@clerk/react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      <nav className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/react"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`
          }
        >
          React Remote
        </NavLink>
        <NavLink
          to="/vue"
          className={({ isActive }) =>
            `px-4 py-2 rounded font-medium transition-colors ${
              isActive
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:bg-green-50 hover:text-green-600"
            }`
          }
        >
          Vue Remote
        </NavLink>
      </nav>
      <UserButton />
    </header>
  );
}
