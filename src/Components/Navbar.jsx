import React, { useEffect, useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { NavLink, Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("light");

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "You have successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-articles" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>
          All Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>
          About Us
        </NavLink>
      </li>
    </>
  );

  const PrivateLinks = (
    <>
      <li>
        <NavLink to="/my-articles" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>
          My Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/post-article" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : ""}>
          Post Article
        </NavLink>
      </li>
    </>
  );

  // Theme Handling
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Drawer open/close handlers
  const openDrawer = () => {
    document.getElementById("left-drawer").classList.remove("-translate-x-full");
  };
  const closeDrawer = () => {
    document.getElementById("left-drawer").classList.add("-translate-x-full");
  };

  return (
    <div className="navbar bg-base-100 mb-16 shadow-sm fixed px-4 top-0 left-0 right-0 z-40">
      {/* Left: Drawer toggle (Mobile) */}
      <div className="navbar-start">
        <button onClick={openDrawer} className="btn btn-ghost lg:hidden">
          <FaBars />
        </button>

        {/* Logo & Theme Toggle */}
        <div className="flex items-center">
          <Link to="/" className="btn btn-ghost text-xl">Spread Knowledge</Link>
          <button onClick={handleTheme} className="ml-2">
            {theme === "light" ? <BsToggleOff size={35} /> : <BsToggleOn size={35} />}
          </button>
        </div>
      </div>

      {/* Center menu for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5">{links}{user && PrivateLinks}</ul>
      </div>

      {/* Right: Login/User Menu */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">Login</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "userPhoto"} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 shadow rounded-box mt-3 w-52 z-10"
            >
              <li className=""><a>{user.displayName}</a></li>
              {PrivateLinks}
              <li>
                <button className="btn" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Left Drawer for Mobile */}
      <div
        id="left-drawer"
        className="fixed top-0 left-0 w-64 h-screen bg-base-100 shadow-lg transform -translate-x-full transition-transform duration-300 z-50 p-5"
      >
        <button onClick={closeDrawer} className="btn btn-sm btn-circle mb-5">
          ✕
        </button>
        <ul className="menu">
          {links}
          {user && PrivateLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
