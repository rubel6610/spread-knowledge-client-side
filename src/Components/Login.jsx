import React from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth"; // তোমার custom hook

const Login = () => {
  const { loginUser, googlesignIn } = useAuth();
  const navigate = useNavigate();



  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  const handleGoogle = () => {
    googlesignIn()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google Sign-In Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none "
            />
          </div>

       
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none "
            />
          </div>

  
          <button
            type="submit"
            className="w-full btn btn-primary text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>
         <p className="my-2">
          Don't have an account{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </p>

        
        <div className="divider text-gray-400 my-4">OR</div>

      
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 border border-gray-500 hover:bg-gray-700 text-white py-2 rounded-lg transition duration-300"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        
      </div>
    </div>
  );
};

export default Login;
