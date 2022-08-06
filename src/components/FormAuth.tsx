import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { EMAIL_REGEXP } from "../hooks/regexp-hook";
import ErrorsInput from "./ErrorsInput";

// тип props-ов
interface FormProps {
  textButton: string;
  handleClick: (email: string, password: string) => void;
}

// типы инпутов
interface Inputs {
  email: string;
  password: string;
}

// компонент
const FormAuth: React.FC<FormProps> = ({ textButton, handleClick }) => {
  // инструменты валидации формы
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ criteriaMode: "all" });

  // отправка формы
  const submitForm: SubmitHandler<Inputs> = ({email, password}) => {
    handleClick(email, password);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* Поле Email */}
      <div className="text-white flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: EMAIL_REGEXP })}
          placeholder="Enter Email"
          className="text-black p-2 text-base rounded-[5px] w-[300px]"
        />
        {/* Сообщения об ошибках валидации */}
        {errors.email?.type === 'required' && <ErrorsInput errorType="required"/>}
        {errors.email?.type === 'pattern' && <ErrorsInput errorType="pattern"/>}
      </div>

      {/* Поле Password */}
      <div className="text-white flex flex-col mt-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true, minLength: 6, onChange(event) {
            setValue("password", event.target.value.trim().replace(/ +g/, ''))
          }, })}
          placeholder="Enter password"
          className="text-black p-2 text-base rounded-[5px] w-[300px]"
        />
        {/* Сообщения об ошибках валидации */}
        {errors.password?.type === 'required' && <ErrorsInput errorType="required"/>}
        {errors.password?.type === 'minLength' && <ErrorsInput errorType="minLength"/>}
      </div>

      <button
        className="w-[300px] p-2 text-base mt-5 rounded-md bg-slate-200"
        type="submit"
      >
        {textButton}
      </button>
    </form>
  );
};

export default FormAuth;
