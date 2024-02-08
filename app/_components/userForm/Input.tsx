import style from './styles/input.module.scss'
import { IInput } from './types'

export default function Input({
  type,
  name,
  onChange,
  value,
  placeholder,
  maxLength,
}: IInput) {
  return (
    <input
      className={style.input}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder ?? ''}
      maxLength={maxLength ?? 30}
    />
  )
}