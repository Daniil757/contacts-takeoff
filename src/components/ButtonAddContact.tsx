import React from "react";

interface AddProps {
  handlePopup: () => void // открытие popup
}

// кнопка на сайте для добаления контакта - fixed в нижней части
const ButtonAddContact: React.FC<AddProps> = ({handlePopup}) => {
  return (
    <button className="fixed w-12 h-12 rounded-[50%] bg-blue-500 text-white text-4xl flex justify-center bottom-5" onClick={handlePopup}>
      +
    </button>
  );
};

export default ButtonAddContact;
