
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(removeUser());
      navigate("/login");
    }
  };

  const navLinks = [
    { label: "Discover", path: "/feed" },
    { label: "Connections", path: "/connections" },
    { label: "Requests", path: "/requests" },
  ];

  const isLoggedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white shadow-lg shadow-slate-950/10 backdrop-blur-xl">
      <div className="navbar mx-auto min-h-[76px] max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex-1">
          <Link
            to={isLoggedIn ? "/feed" : "/"}
            className="group flex items-center gap-3 rounded-xl"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-violet-500 to-indigo-600 text-xl font-black shadow-lg shadow-violet-500/25 transition duration-300 group-hover:rotate-3 group-hover:scale-105">
              D
            </span>

            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Dev<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Tinder</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isLoggedIn && location.pathname !== "/login" && (
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 ${
                    active
                      ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex-none">
          {isLoggedIn && location.pathname !== "/login" ? (
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 pr-3 transition hover:border-violet-400/50 hover:bg-white/10 sm:gap-3 sm:pl-2"
                aria-label="Open profile menu"
              >
                <div className="avatar">
                  <div className="h-9 w-9 rounded-full ring-2 ring-violet-400/70 ring-offset-2 ring-offset-slate-950 sm:h-10 sm:w-10">
                    <img
                      src={
                        user.photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-28 truncate text-sm font-semibold text-white">
                    {user.firstName || "Developer"}
                  </p>
                  <p className="text-xs text-slate-400">My account</p>
                </div>

                <svg
                  className="hidden h-4 w-4 text-slate-400 sm:block"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[100] mt-3 w-60 rounded-2xl border border-slate-700 bg-slate-900 p-2 text-slate-200 shadow-2xl shadow-black/30"
              >
                <li className="menu-title px-3 py-2 text-xs uppercase tracking-widest text-slate-500">
                  Your account
                </li>

                <li>
                  <Link to="/profile" className="rounded-xl py-3 hover:bg-violet-500/15 hover:text-violet-300">
                    <span>👤</span> My Profile
                  </Link>
                </li>

                <li>
                  <Link to="/connections" className="rounded-xl py-3 hover:bg-violet-500/15 hover:text-violet-300">
                    <span>🤝</span> Connections
                  </Link>
                </li>

                <li>
                  <Link to="/requests" className="rounded-xl py-3 hover:bg-violet-500/15 hover:text-violet-300">
                    <span>📩</span> Requests
                  </Link>
                </li>

                <div className="my-1 border-t border-slate-700" />

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-xl py-3 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <span>↪</span> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:shadow-violet-500/40"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isLoggedIn && location.pathname !== "/login" && (
        <div className="border-t border-white/5 px-3 py-2 md:hidden">
          <nav className="mx-auto flex max-w-7xl items-center justify-around gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex-1 rounded-xl px-2 py-2.5 text-center text-xs font-medium transition sm:text-sm ${
                    active
                      ? "bg-violet-500/15 text-violet-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
