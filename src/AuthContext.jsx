import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(() => sessionStorage.getItem('jwt'));

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  const login = (token) => {
    setJwt(token);
  };

  const logout = () => {
    setJwt(null);
  };

  const isLoggedIn = !!jwt;

  return (
    <AuthContext.Provider value={{ jwt, setJwt, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
