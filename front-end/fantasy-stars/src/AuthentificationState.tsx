import React, { createContext, useState, useContext, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const updateLoggedIn: AuthContextType['setLoggedIn'] = (newLoggedIn) => {
    localStorage.setItem('loggedIn', JSON.stringify(newLoggedIn));
    setLoggedIn(newLoggedIn);
    
    if (!newLoggedIn) {
      navigate("/")    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLoggedIn = localStorage.getItem('loggedIn');
      if (storedLoggedIn) {
        setLoggedIn(JSON.parse(storedLoggedIn));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn: updateLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
