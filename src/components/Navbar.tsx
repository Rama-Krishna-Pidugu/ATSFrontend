
import React from "react";
import { NavLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="font-bold text-xl">
            <span className="gradient-text">People</span>GPT
          </div>
        </NavLink>

        <nav className="flex items-center gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Search
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Candidates
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Upload
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
