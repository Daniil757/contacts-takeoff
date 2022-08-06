import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// определение свойст одного контакта
export interface ContactI {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  userId: number;
}

// определение свойст начального состояния
interface ContactsI {
  contacts: ContactI[];
  filteredContacts: ContactI[];
  currentContact: ContactI | null;
}

// начальное состояние
const initialState: ContactsI = {
  contacts: [],
  filteredContacts: [],
  currentContact: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // срабатывает при получении данных от сервера
    setContacts(state, action: PayloadAction<ContactI[]>) {
      state.contacts = action.payload;
      state.filteredContacts = action.payload;
    },
    // добавление контакта
    addContact(state, action: PayloadAction<ContactI>) {
      state.contacts = [...state.contacts, action.payload];
      state.filteredContacts = state.contacts;
    },
    // редактирование контакта
    editContact(state, action: PayloadAction<ContactI>) {
      let contactIndex = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.contacts[contactIndex] = action.payload;
      state.filteredContacts = state.contacts;
    },
    // удаление контакта по id
    removeContact(state, action: PayloadAction<number>) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      state.filteredContacts = state.contacts;
    },
    // очищаем контакты при выходе из аккаунта
    clearContacts(state) {
      state.contacts = [];
      state.currentContact = null;
      state.filteredContacts = [];
    },
    // фильтрация контактов - поиск
    filterContacts(state, action: PayloadAction<string>) {
      state.filteredContacts = state.contacts.filter(
        (contact) =>
          `${contact.firstName} ${contact.lastName}`.search(
            action.payload.trim()
          ) !== -1
      );
    },
    // получаем текущего контакта для редактирования
    setCurrentContact(state, action: PayloadAction<ContactI>) {
      state.currentContact = action.payload;
    },
    // очищаем текущего пользователя при закрытии окна редактирования
    removeCurrentContact(state) {
      state.currentContact = null;
    },
  },
});

export const {
  setContacts,
  setCurrentContact,
  addContact,
  editContact,
  filterContacts,
  removeCurrentContact,
  removeContact,
  clearContacts,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;