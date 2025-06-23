import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router"; // Correct import
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useAuth();
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-articles"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : ""
          }
        >
          All Articles
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : ""
              }
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/post-article"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : ""
              }
            >
              Post Article
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : ""
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Spread Knowledge
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5">{links}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/2FsfXqM/default-avatar.png"
                  }
               
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box mt-3 w-52 z-10"
            >
              <li>
                <Link to="/my-articles">My Articles</Link>
              </li>
              <li>
                <Link to="/post-article">Post Article</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
