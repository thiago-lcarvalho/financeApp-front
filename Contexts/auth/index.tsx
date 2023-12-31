import React, { ReactNode, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseUrl = 'http://18.219.7.94:8080'

export interface Auth {
  token: string | null;
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
}

type ContextProps = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

type MainContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as ContextProps);

export const AuthContextProvider = ({ children }: MainContextProviderProps) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);
  useEffect(() => {
    async function loadAuthData() {
      try {
        const savedAuthJSON = await AsyncStorage.getItem('authData');
        if (savedAuthJSON) {
          const savedAuth: Auth = JSON.parse(savedAuthJSON);
          setAuth(savedAuth);
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      }
    }

    loadAuthData();
  }, []);
  useEffect(() => {
    async function saveAuthData() {
      try {
        await AsyncStorage.setItem('authData', JSON.stringify(auth));
      } catch (error) {
        console.error('Error saving auth data:', error);
      }
    }
    saveAuthData();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
