import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({children}) => {
  const { user,loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }
  if(!user){
    return <Navigate to="/login" state={{from:location}} replace/>
  }

  return children
};

export default PrivateRoutes;
