import React, { createContext, useEffect, useState } from "react";
import { auth } from "./../Firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUserInfo = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googlesignIn = () => {
    return signInWithPopup(auth,provider)
  };

  const logout = () => {
    localStorage.removeItem("token");
    return signOut(auth);
    
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if(currentUser){
        axios.post(`${import.meta.env.VITE_BASEURL}/jwt`, {email:currentUser.email})
        .then(res=>{
          localStorage.setItem("token", res.data.token);
        })
         
        
      } 
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const userInfo = {
    user,
    createuser,
    loginUser,
    updateUserInfo,
    logout,
    googlesignIn,
    loading,
    setLoading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
