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
        BASE_URL + "/logout",
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

  return (
    <div className="navbar relative z-50 bg-base-300 shadow-md px-4 sm:px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold tracking-tight hover:bg-base-100"
        >
          <span className="text-primary">💻 DevTinder</span>
        </Link>
      </div>

      {/* User Dropdown */}
      <div className="flex-none">
        {user && location.pathname !== "/login" && (
          <div className="dropdown dropdown-end">
            {/* Welcome + Avatar */}
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-3 rounded-full py-1 pl-3 pr-1 hover:bg-base-100 transition-colors cursor-pointer"
            >
              <span className="hidden sm:block text-sm font-medium">
                Welcome,{" "}
                <span className="text-primary font-semibold">
                  {user.firstName}
                </span>
              </span>

              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-300">
                  <img
                    alt="Profile"
                    src={
                      user.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-[9999] mt-3 w-60 p-2 shadow-xl border border-base-300"
            >
              {/* User Details */}
              <li className="menu-title px-3 py-2">
                <span className="text-xs uppercase tracking-wider">
                  Account
                </span>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-xl py-3"
                >
                  <span className="text-lg">👤</span>
                  <span className="flex-1">Profile</span>
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="flex items-center gap-3 rounded-xl py-3"
                >
                  <span className="text-lg">🤝</span>
                  <span>Connections</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="flex items-center gap-3 rounded-xl py-3"
                >
                  <span className="text-lg">📩</span>
                  <span>Requests</span>
                </Link>
           
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl py-3 text-error hover:bg-error/10"
                >
                  <span className="text-lg">🚪</span>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
