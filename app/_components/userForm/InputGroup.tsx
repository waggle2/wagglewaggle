import style from './styles/inputGroup.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import Input from './Input'
import { IButton, IInput } from './types'
import { ReactElement } from 'react'

type Props = {
  labelText: string
  inputProps: IInput
  buttonProps?: IButton
  inputIcon?: ReactElement
  errorMessage?: string
  description?: string
}

export default function InputGroup({
  labelText,
  inputProps,
  buttonProps,
  inputIcon,
  errorMessage,
  description,
}: Props) {
  const { text, active, inactive, onClick, type = 'submit' } = buttonProps || {}
  return (
    <div className={style.container}>
      <h3 className={style.title}>{labelText}</h3>
      <label className={style.label}>
        <Input {...inputProps} />
        {inputIcon && inputIcon}
      </label>
      {buttonProps && Object.keys(buttonProps).length > 0 && (
        <button
          className={cx('button', { active, inactive })}
          onClick={onClick}
          type={type}
        >
          {text}
        </button>
      )}
      {errorMessage ? (
        <p className={style.error}>
          <span>&middot;</span>&nbsp; {errorMessage}
        </p>
      ) : description ? (
        <p className={cx('error', 'description')}>
          <span>&middot;</span>&nbsp; {description}
        </p>
      ) : null}
    </div>
  )
}
