import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import {
  removeContact,
  setContacts,
  setCurrentContact,
} from "../store/slices/contactsSlice";
import { removeUser } from "../store/slices/userSlice";

interface ListProps {
  handlePopup: () => void;
}

const ContactsList: React.FC<ListProps> = ({ handlePopup }) => {
  // данные redux
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const userId = useAppSelector(state => state.user.id)
  const filteredContacts = useAppSelector(
    (state) => state.contacts.filteredContacts
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // при загрузке страницы получаем все контакты текущего пользователя
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3003/contacts?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // если у пользовтеля нет контактов останавливаем дальнейшее выполнение функции
        if (res.status === 403) {
          return
        }
        const data = await res.json();
        if (data === "jwt expired") {
          throw new Error("jwt expired");
        }
        dispatch(setContacts(data));
      } catch (error) {
        dispatch(removeUser());
        navigate("/login");
        alert((error as Error).message);
      }
    };
    fetchData();
  }, [accessToken, dispatch, navigate, userId]);

  // отправление на редактирование Контакта + открытие окна редактирования
  const editContact = async (id: number) => {
    try {
      let res = await fetch(`http://localhost:3003/contacts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let data = await res.json();
      if (!data.id) {
        throw new Error("контакт не найден");
      }
      dispatch(
        setCurrentContact({
          id: data.id,
          lastName: data.lastName,
          firstName: data.firstName,
          phone: data.phone,
          userId: data.userId
        })
      );
      handlePopup();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  //  удаление контакта
  const deleteContact = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3003/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      })
      if (res.status === 404) {
        throw new Error('contact not found')
      }
      dispatch(removeContact(id))
    } catch (error) {
      alert((error as Error).message)
    }
  }
  
  return filteredContacts?.length !== 0 ? (
    <ul className="text-slate-200 flex flex-col gap-5 mt-4">
      {filteredContacts.map((contact) => (
        <li
          key={contact.id}
          className="flex w-[768px] justify-between items-center"
        >
          {/* Информация о контакте */}
          <div className="flex gap-3">
            <span className="w-[50px] h-[50px] block bg-slate-400 rounded-[50%]"></span>
            <div>
              <p>
                {contact.firstName} {contact.lastName}
              </p>
              <p>{contact.phone}</p>
            </div>
          </div>

          {/* Кнопки Удалить и Редактировать */}
          <div className="flex gap-6 h-[100%]">

            <button
              className="h-[100%] px-4 bg-yellow-500 rounded text-gray-800"
              onClick={() => editContact(contact.id)}
            >
              Редактировать
            </button>

            <button
              className="h-[100%] px-4 bg-red-500 rounded text-gray-800"
              onClick={() => deleteContact(contact.id)}
            >
              Удалить
            </button>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="text-white mt-7">Контактов не найдено</div>
  );
};

export default ContactsList;
