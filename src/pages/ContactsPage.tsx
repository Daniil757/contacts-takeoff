import { useState } from "react";
import ButtonAddContact from "../components/ButtonAddContact";
import ContactsList from "../components/ContactsList";
import EditAddContact from "../components/EditAddContact";
import SearchContacts from "../components/SearchContacts";
import SignOut from "../components/SignOut";
import MainLayout from "../layouts/MainLayout";

// страница с контактами
const ContactsPage = () => {
  // определяет открыто или нет окно редактирования/добавления
  const [popup, setPopup] = useState(false);

  // изменяет состояние окна редактирования/добавления
  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <MainLayout>
      <div className="w-[1024px] bg-slate-800 flex flex-col items-center p-4">
        {/* шапка с заголовком и кнопкой выхода */}
        <div className="flex w-[768px]">
          <h1 className="text-white text-5xl mb-5 grow text-center">
            Контакты
          </h1>
          {/* кнопка выхода */}
          <SignOut />
        </div>
        {/* поиск */}
        <SearchContacts />
        {/* список контактов */}
        <ContactsList handlePopup={handlePopup} />
        {/* кнопка добавления контакта */}
        <ButtonAddContact handlePopup={handlePopup} />
        {/* окно добавления/редактирования контакта */}
        {popup && <EditAddContact handlePopup={handlePopup} />}
      </div>
    </MainLayout>
  );
};

export default ContactsPage;
