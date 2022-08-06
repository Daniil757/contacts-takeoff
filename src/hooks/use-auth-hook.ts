import { useAppDispatch } from './redux-hook';
import { LOCAL_KEY, setUser, UserI } from '../store/slices/userSlice';

// возвращает true - если пользователь зарегистрирован, false - нет
export const useAuth = () => {
  const dispatch = useAppDispatch()
  if (localStorage.getItem("userData")) {
    let dataStorage: UserI = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    dispatch(setUser({
      id: dataStorage.id,
      email: dataStorage.email,
      accessToken: dataStorage.accessToken
    }))
    return !!dataStorage.accessToken
  }
  return false
}