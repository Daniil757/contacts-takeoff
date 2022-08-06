import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux-hook";
import { clearContacts } from "../store/slices/contactsSlice";
import { removeUser } from "../store/slices/userSlice";

const SignOut = () => {
  const dispacth = useAppDispatch()
  const navigate = useNavigate()
  // функция выходы из аккаунта
  const signOutUser = () => {
    dispacth(removeUser())
    dispacth(clearContacts())
    navigate("/login")
  }
  return (
    <div className="relative w-1">
      <span className="absolute text-gray-300 text-3xl top-[45%] translate-x-[-120%] translate-y-[-50%]">
        &rarr;
      </span>
      <span className="absolute w-[20px] h-[30px] border-[2px] border-white block rounded-[2px] top-[50%] translate-x-[-100%] translate-y-[-50%] hover:cursor-pointer"
        onClick={signOutUser}
      ></span>
    </div>
  );
};

export default SignOut;
