import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormAuth from "../components/FormAuth";
import { useAppDispatch } from "../hooks/redux-hook";
import AuthLayout from "../layouts/AuthLayout";
import { setUser } from "../store/slices/userSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // реализует регистрацию пользователя
  const register = async (email: string, password: string) => {
    try {
      let res = await fetch("http://localhost:3003/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await res.json();
      if (!data.accessToken) {
        throw new Error(data);
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
          Register
        </h3>
        <FormAuth textButton={"Register"} handleClick={register} />
        <span className="w-[300px] block text-center text-white mt-2">
          Если есть аккаунт -{" "}
          <Link to="/login" className="text-blue-600">
            Войти
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
