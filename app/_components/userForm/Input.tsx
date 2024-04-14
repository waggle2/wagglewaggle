import { IInput } from '@/app/_types/userFormTypes'
import style from './styles/input.module.scss'

export default function Input({
  type,
  name,
  onChange,
  value,
  placeholder,
  maxLength,
  tabIndex,
  disabled = false,
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
      tabIndex={tabIndex ?? 0}
      disabled={disabled}
    />
  )
}
