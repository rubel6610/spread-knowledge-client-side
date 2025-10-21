import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";
import axios from "axios";

const Register = () => {
  const { createuser, updateUserInfo, googlesignIn } = useAuth();
  const navigate = useNavigate();

  const [passError, setPassError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(formData.entries());

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setPassError("Password must be at least 6 characters with at least one uppercase and one lowercase letter.");
      return;
    }

    setPassError(""); // Clear previous error

    createuser(email, password)
      .then((result) => {
        const user = result.user;

        updateUserInfo({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            const newUser = {
              email: user.email,
              userName: name,
              photoURL: photo || '',
              bio: '',
              createdAt: new Date(),
            };

            axios.post(`${import.meta.env.VITE_BASEURL}/user`, newUser)
              .then((res) => {
                if (res.data.insertedId) {
                  Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            setFirebaseError(error.message);
          });
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  // Google Register
  const handleGoogleRegister = () => {
    googlesignIn()
      .then((result) => {
        const user = result.user;
        const newUser = {
          email: user.email,
          userName: user.displayName || 'Anonymous',
          photoURL: user.photoURL || '',
          bio: '',
          createdAt: new Date(),
        };

        axios.post(`${import.meta.env.VITE_BASEURL}/user`, newUser)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch(error => {
            console.error('Error saving user:', error);
            navigate("/");
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.code,
          text: error.message,
          showConfirmButton: false,
        });
      });
  };

  return (
    <>
     
      <div className="min-h-screen flex items-center justify-center mt-16 p-4">
        <div className="bg-base-200 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center  ">Register</h2>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                className="w-full px-4 py-2 border border-gray-600  rounded-lg focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                className="w-full px-4 py-2 border border-gray-600  rounded-lg focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="photo" className="block mb-2">Photo URL</label>
              <input
                className="w-full px-4 py-2 border border-gray-600  rounded-lg focus:outline-none"
                type="text"
                name="photo"
                id="photo"
                placeholder="Enter photo URL"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                className="w-full px-4 py-2 border border-gray-600  rounded-lg focus:outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
              {passError && <p className="text-red-400 text-sm mt-2">{passError}</p>}
            </div>

            {firebaseError && <p className="text-red-400 text-sm mt-1">{firebaseError}</p>}

            <button
              type="submit"
              className="w-full btn btn-primary  py-2 rounded-lg font-semibold transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="my-2">
            Already have an account{" "}
            <Link className="text-blue-600" to="/login">Login</Link>
          </p>

          <div className="divider  my-4">OR</div>

          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-2 border border-gray-500 hover: py-2 rounded-lg transition duration-300"
          >
            <FcGoogle className="text-xl" /> Sign Up with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
