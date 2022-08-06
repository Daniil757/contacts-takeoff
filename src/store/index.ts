import { contactsReducer } from './slices/contactsSlice';
import { userReducer } from './slices/userSlice';
import { configureStore } from "@reduxjs/toolkit";

// создаем хранилище
const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer
  }
})

// выводим типы для создания своих методов useAppDispatch и useAppSelector
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store