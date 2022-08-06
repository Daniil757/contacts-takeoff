import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const LOCAL_KEY = "userData";

// определение свойств пользователя 
export interface UserI {
  id: number | null;
  email: string | null;
  accessToken: string | null;
}

// начальное состояние
const initialState: UserI = {
  id: null,
  email: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // установка пользователя при входе/регистрации
    setUser(state, action: PayloadAction<UserI>) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem(
        LOCAL_KEY,
        JSON.stringify({
          id: state.id,
          email: state.email,
          accessToken: state.accessToken,
        })
      );
    },
    // стирание данных о пользователе при выходе
    removeUser(state) {
      localStorage.removeItem(LOCAL_KEY);
      state.id = null;
      state.email = null;
      state.accessToken = null;
    }
  },
});

export const { removeUser, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer
