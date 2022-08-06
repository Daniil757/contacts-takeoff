import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth-hook";

// контейнер для страниц входа и регистрации
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return !useAuth() ? (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {children}
    </div>
  ) : (
    <Navigate replace to="/" />
  );
};

export default AuthLayout;
