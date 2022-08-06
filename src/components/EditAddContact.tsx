import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { PHONE_REGEXP } from "../hooks/regexp-hook";
import {
  addContact,
  editContact,
  removeCurrentContact,
} from "../store/slices/contactsSlice";
import ErrorsInput from "./ErrorsInput";

interface Inputs {
  lastName: string;
  firstName: string;
  phone: string;
}

interface PopupProps {
  handlePopup: () => void;
}

// POPUP
const EditAddContact: React.FC<PopupProps> = ({ handlePopup }) => {
  // методы валидации и отправки формы
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  });

  // данные redux
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const userId = useAppSelector((state) => state.user.id);
  // получаю данные о текущем контакте, если есть данные - редактирование, нет - добавление
  const currentContact = useAppSelector(
    (state) => state.contacts.currentContact
  );

  // при открытии popup записываем данные о текущем контакте в инпуты, если это редактирование
  useEffect(() => {
    if (currentContact) {
      setValue("firstName", currentContact?.firstName);
      setValue("lastName", currentContact?.lastName);
      setValue("phone", currentContact?.phone);
    }
  }, [setValue, currentContact]);

  // функция обновления/добавления контакта
  const submitForm: SubmitHandler<Inputs> = async ({ firstName, lastName, phone }) => {
    // если данные не изменились не выполняем запрос
    if (currentContact?.firstName === firstName && currentContact?.lastName === lastName && currentContact?.phone === phone) {
      handlePopup();
      return;
    }
    try {
      // если есть текущий контакт, то добавляем его id в запрос - редактирование, нет id - добавление контакта, ничего не добавляем
      const res = await fetch(`http://localhost:3003/contacts/${currentContact?.id ? currentContact?.id : ""}`,
        {
          // если есть текущий контакт - обновляем данные, нет - добавляем
          method: currentContact ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phone,
            userId,
          }),
        }
      );
      const contact = await res.json();
      if (!contact.id) {
        throw new Error("ошибка при выполнении");
      }
      // в заивисимости какое действие (добавление, редактирование) выполняем соответствующую функцию 
      currentContact
        ? dispatch(editContact(contact))
        : dispatch(addContact(contact));
      currentContact && dispatch(removeCurrentContact());
      handlePopup();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="fixed w-[100vw] h-[100vh] bg-black bg-opacity-50 top-0 left-0 backdrop-blur-sm">
      <form
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[700px] bg-gray-700 rounded-xl flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="text-white flex flex-col">
          <label htmlFor="lastName">Фамилия</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: true,
              onChange(event) {
                setValue(
                  "lastName",
                  event.target.value.trim().replace(/ +g/, "")
                );
              },
            })}
            placeholder="Введите фамилию"
            className="text-black p-2 text-base rounded-[5px] w-[300px]"
          />
          {/* Сообщения об ошибках валидации */}
          {errors.lastName?.type === "required" && (
            <ErrorsInput errorType="required" />
          )}
        </div>

        <div className="text-white flex flex-col">
          <label htmlFor="firstName">Имя</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: true,
              onChange(event) {
                setValue(
                  "firstName",
                  event.target.value.trim().replace(/ +g/, "")
                );
              },
            })}
            placeholder="Введите имя"
            className="text-black p-2 text-base rounded-[5px] w-[300px]"
          />
          {/* Сообщения об ошибках валидации */}
          {errors.firstName?.type === "required" && (
            <ErrorsInput errorType="required" />
          )}
        </div>

        <div className="text-white flex flex-col">
          <label htmlFor="phone">Телефон</label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: true,
              pattern: PHONE_REGEXP
            })}
            placeholder="+7 (988) 542-98-48"
            className="text-black p-2 text-base rounded-[5px] w-[300px]"
          />
          {/* Сообщения об ошибках валидации */}
          {errors.phone?.type === "required" && (
            <ErrorsInput errorType="required" />
          )}
          {errors.phone?.type === "pattern" && (
            <ErrorsInput errorType="pattern" />
          )}
        </div>

        {/* кнопка Сохранить */}
        <button
          className="w-[300px] p-2 text-base mt-5 rounded-md bg-slate-200"
          type="submit"
        >
          Сохранить
        </button>
        {/* кнопка Закрыть */}
        <span
          className="absolute top-[10px] right-[20px] rotate-[45deg] text-4xl hover:cursor-pointer text-white"
          onClick={handlePopup}
        >
          +
        </span>
      </form>
    </div>
  );
};

export default EditAddContact;