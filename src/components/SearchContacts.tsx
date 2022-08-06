import React from "react";
import { useAppDispatch } from "../hooks/redux-hook";
import { filterContacts } from "../store/slices/contactsSlice";

const SearchContacts = () => {
  const dispatch = useAppDispatch();
  // поиск
  const searchContact = (substr: string) => {
    dispatch(filterContacts(substr));
  };
  return (
    <input
      type="text"
      className="text-black w-[768px] text-lg p-2 rounded-md"
      onChange={(e) => searchContact(e.target.value)}
      placeholder="Поиск..."
    ></input>
  );
};

export default SearchContacts;
