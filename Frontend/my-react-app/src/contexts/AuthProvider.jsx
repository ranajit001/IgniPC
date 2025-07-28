import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";




export const AuthProvider = ({ children }) => {
  const saved = JSON.parse(localStorage.getItem('auth')) || {user:null,accessToken: null};
  const [auth, setAuth] = useState({user:saved.user,accessToken: saved.accessToken});



  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
