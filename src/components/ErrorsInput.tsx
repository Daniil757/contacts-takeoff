import React from 'react'

const ErrorsInput = ({errorType}: {errorType: string}) => {
  return (
    <span className="text-sm text-red-600">
      {errorType === 'required' && <span>Это поле обязательно для заполнения</span>}
      {errorType === 'minLength' && <span>Минмум 6 символов</span>}
      {errorType === 'pattern' && <span>Введите корректное значение</span>}
    </span>
  )
}

export default ErrorsInput
