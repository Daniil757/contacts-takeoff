import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormAuth from "../components/FormAuth";
import { useAppDispatch } from "../hooks/redux-hook";
import AuthLayout from "../layouts/AuthLayout";
import { setUser } from "../store/slices/userSlice";

const LoginPage = () => {
  // redux
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // реализует вход в аккаунт
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!data.accessToken) {
        throw new Error(data)
      }
      dispatch(
        setUser({
          id: data.user.id,
          email: data.user.email,
          accessToken: data.accessToken,
        })
      );
      navigate("/");
    } catch (error) {
      alert((error as Error).message)
    }
  };

  return (
    <AuthLayout>
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-center text-white font-bold text-3xl mb-4">
          LogIn
        </h3>
        <FormAuth textButton={"Login"} handleClick={login} />
        <span className="w-[300px] block text-center text-white mt-2">
          Если нет аккаунта -{" "}
          <Link to="/register" className="text-blue-600">
            Зарегистрироваться
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
