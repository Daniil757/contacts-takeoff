import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth-hook'

// контейнер для страниц пользователя
const MainLayout = ({children}: {children: React.ReactNode}) => {
  return useAuth() ? (
    <div className='w-[100vw] min-h-[100vh] flex justify-center'>{children}</div>
  ) : (<Navigate replace to="/login"/>)
}

export default MainLayout