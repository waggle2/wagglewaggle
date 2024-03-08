import style from './styles/inputGroup.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import Input from './Input'
import { ReactElement } from 'react'
import { IButton, IInput } from '@/app/_types/userFormTypes'

type Props = {
  labelText?: string
  inputProps: IInput
  buttonProps?: IButton
  inputIcon?: ReactElement
  errorMessage?: string
  description?: string
  isTitle?: boolean
}

export default function InputGroup({
  isTitle = true,
  labelText = '',
  inputProps,
  buttonProps,
  inputIcon,
  errorMessage,
  description,
}: Props) {
  const {
    text,
    active,
    inactive,
    onClick,
    type = 'submit',
    disabled = false,
  } = buttonProps || {}
  return (
    <div className={style.container}>
      {isTitle && <h3 className={style.title}>{labelText}</h3>}
      <label className={style.label}>
        <Input {...inputProps} />
        {inputIcon && <span className={style.iconSpan}>{inputIcon}</span>}
      </label>
      {buttonProps && Object.keys(buttonProps).length > 0 && (
        <button
          className={cx('button', { active, inactive })}
          onClick={onClick}
          type={type}
          disabled={disabled}
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
