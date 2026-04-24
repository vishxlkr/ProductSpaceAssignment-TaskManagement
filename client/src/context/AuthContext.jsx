import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [token, setToken] = useState(Cookies.get("token") || null);
   const [loading, setLoading] = useState(true);

   // Setup Axios defaults
   axios.defaults.baseURL = "http://localhost:5000/api";

   useEffect(() => {
      if (token) {
         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
         fetchUser();
      } else {
         delete axios.defaults.headers.common["Authorization"];
         setLoading(false);
      }
   }, [token]);

   const fetchUser = async () => {
      try {
         const { data } = await axios.get("/auth/me");
         setUser(data);
      } catch (error) {
         console.error("Fetch user failed", error);
         logout();
      } finally {
         setLoading(false);
      }
   };

   const login = async (email, password) => {
      const { data } = await axios.post("/auth/login", { email, password });
      setToken(data.token);
      Cookies.set("token", data.token, { expires: 1 });
      return true; // Used to trigger navigation or redirect
   };

   const register = async (email, password) => {
      const { data } = await axios.post("/auth/register", { email, password });
      setToken(data.token);
      Cookies.set("token", data.token, { expires: 1 });
      return true;
   };

   const logout = () => {
      setToken(null);
      setUser(null);
      Cookies.remove("token");
   };

   return (
      <AuthContext.Provider
         value={{ user, token, loading, login, register, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
};
