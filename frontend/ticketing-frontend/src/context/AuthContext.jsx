import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const {
    data: user,
    isLoading,

  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axios.get("/users/me");
      return res.data;
    },
    retry: false,
  });


  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
