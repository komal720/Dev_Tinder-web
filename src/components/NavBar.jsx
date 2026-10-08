import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  console.log(user);

  return (
    <div className="navbar bg-base-300 shadow-sm">

      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          💻DevTinder
        </Link>
      </div>

      {/* User */}
      <div className="flex-none">
        {user && location.pathname !== "/login" && (
          <div className="dropdown dropdown-end mx-5 flex items-center">

            {/* Welcome */}
            <div className="form-control">
              Welcome, {user.firstName}
            </div>

            {/* Profile Image */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  👤 Profile
                </Link>
              </li>

              <li>
                <Link to="/settings">
                  ⚙️ Settings
                </Link>
              </li>

              <li>
                <button>
                  🚪 Logout
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