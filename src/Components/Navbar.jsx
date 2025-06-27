import React, { useState } from "react";
import { BsToggleOff,BsToggleOn } from "react-icons/bs";
import { NavLink, Link } from "react-router"; 
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaBars } from 'react-icons/fa';


const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme,setTheme]=useState("light");
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
     
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : ""
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );
  const PrivateLinks =    (
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
    ) 

    // handle theme function
    const handleTheme = ()=>{
      const newTheme = theme === "light"? "dark":"light"
      document.documentElement.setAttribute("data-theme",newTheme);
      setTheme(newTheme)
    }
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
            {PrivateLinks}
          </ul>
        </div>
        <div className="flex items-center">
           <Link to="/" className="btn btn-ghost text-xl">
          Spread Knowledge
        </Link>
        <button onClick={handleTheme}>{theme=== "light" ?<BsToggleOff size={35}/> :<BsToggleOn size={35}/>}</button>
        </div>
       
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5">{links}{PrivateLinks}</ul>
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
                   "userPhoto"
                  }
               
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box mt-3 w-52 z-10"
            >
             {user && PrivateLinks}
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
