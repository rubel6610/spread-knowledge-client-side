import React, { createContext, useState } from 'react';
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

    const userInfo = {
        user
    }
    return <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;