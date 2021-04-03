import React, { useState, useEffect, useContext, createContext } from "react";
import axios, { AxiosInstance } from "axios";
import { firebase } from "./firebase";
import toast from "react-hot-toast";
import { userInfo } from "os";
import Loader from "./components/loader";
import router from "next/router";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

export const AuthContext = createContext<{
  account: {
    name: string;
    email: string;
    avatar: string;
    current_plan: string;
    expires: string;
    image_quota: number;
    used_quota: number;
    email_verified: number;
  } | null;
}>({
  account: null,
});

export function AuthProvider({ children }: any) {
  const [account, setAccount] = useState<any>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  function getStatus() {
    setIsLoading(true);
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        toast.error("Please try logging in");
        return;
      }

      const token = await user.getIdToken();

      try {
        const response = await client.get(`/getStatus`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAccount((prev: any) => ({ ...prev, ...response.data.account }));
        Object.assign(axios?.defaults?.headers?.common, {
          Authorization: token,
        });
        setIsLoading(false);
      } catch (error) {
        delete axios.defaults.headers.common["Authorization"];
        toast.error(error.response.data.error);
        setIsLoading(false);
        localStorage.clear();

        router.push(`/access`);
      }
    });
  }

  useEffect(() => {
    getStatus();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        Object.assign(axios?.defaults?.headers?.common, {
          Authorization: token,
        });
      } else {
        delete axios.defaults.headers.common["Authorization"];
        toast.error("Please try logging in");
        localStorage.clear();

        router.push(`/access`);
      }
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ account }}>
      {loading && !account?.name ? <Loader /> : <>{children}</>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
