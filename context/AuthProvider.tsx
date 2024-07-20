import JWT from "expo-jwt";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<AuthContextType | null>(null);
const { Provider } = AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState = {
    accessToken: null,
    sub: null,
    expiresAt: null,
    authenticated: false,
  };
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    SecureStore.getItemAsync("auth")
      .then((data) => {
        if (data) {
          try {
            setAccessToken(data);
          } catch (error: any) {
            console.log(error.message);
            setAuthState(initialState);
          } finally {
            setIsLoading(false);
          }
        } else {
          setAuthState(initialState);
          setIsLoading(false);
        }
      });
  }, []);

  const getAccessToken = () => {
    // Check if the access token is still valid
    if (authState.accessToken && authState.expiresAt) {
      const expiresAt = new Date(authState.expiresAt);
      if (expiresAt >= new Date()) {
        setAuthState(initialState);
        return null;
      }
    }
    return authState.accessToken;
  };

  const setAccessToken = (token: string) => {
    const key = process.env.EXPO_PUBLIC_JWT_SECRET; // Remove for deployment

    if (!key) throw new Error("Key not configured.");

    const decoded = JWT.decode(token, key);

    const { sub, exp } = decoded;

    if (!sub || !exp) throw new Error("Token invalid");

    setAuthState({
      accessToken: token,
      sub: sub,
      expiresAt: new Date(exp).toISOString(),
      authenticated: true,
    });
  };

  const signout = async () => {
    const auth = await SecureStore.getItemAsync("auth");

    if (auth) {
      await SecureStore.deleteItemAsync("auth");
    }

    setAuthState(initialState);
  };

  const providerProps: AuthContextType = {
    isLoading,
    authState,
    setAccessToken,
    getAccessToken,
    signout,
  };

  return <Provider value={providerProps}>{children}</Provider>;
};

export { AuthContext, AuthProvider };

type AuthState = {
  accessToken: string | null;
  sub: string | null;
  expiresAt: string | null;
  authenticated: boolean;
};

type AuthContextType = {
  isLoading: boolean;
  authState: AuthState;
  setAccessToken: (token: string) => void;
  getAccessToken: () => string | null;
  signout: () => void;
};
