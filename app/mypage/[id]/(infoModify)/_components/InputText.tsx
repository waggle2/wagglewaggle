import { ChangeEventHandler } from 'react'
import style from './input.module.scss'

type props = {
  placeholder: string
  warning?: string
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function InputText({
  placeholder,
  warning,
  onChange,
  text,
}: props) {
  return (
    <>
      <input
        className={style.input}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={text}
      />
      {warning && <div className={style.errorText}>{warning}</div>}
    </>
  )
}
