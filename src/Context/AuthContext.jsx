import React, { createContext, useContext, useEffect, useState } from "react";

// first create authcontext
export const AuthContext = createContext();
// make function and send props children
export default function AuthContextProvider({ children }) {
  const [UserToken, setUserToken] = useState(localStorage.getItem("token")??"");

  /*
  save token user in  hook
  now usertoken have value *token*  save on it 
  2-go to navBar and  import contextAuth
  */ 

  return (
    <AuthContext.Provider    value={{ UserToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}
