import { ChangeEventHandler } from 'react'
import style from './input.module.scss'

type inputTextProps = {
  placeholder: string
  warning?: string
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: string
  title?: string
}

type disabledTextProps = {
  text?: string
  title?: string
}

export default function InputText({
  placeholder,
  warning,
  onChange,
  text,
  type,
  title,
}: inputTextProps) {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <input
        className={style.input}
        type={type ? type : 'text'}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={text}
      />
      {warning && <div className={style.errorText}>{warning}</div>}
    </div>
  )
}
export function DisabledText({ text, title }: disabledTextProps) {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <input className={style.disabledText} type="text" defaultValue={text} />
    </div>
  )
}
