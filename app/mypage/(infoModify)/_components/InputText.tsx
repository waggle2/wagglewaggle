import Button from '@/app/_components/button/Button'
import { ChangeEventHandler } from 'react'
import style from './input.module.scss'

type inputTextProps = {
  placeholder: string
  warning?: string
  guide?: string
  text: string
  onChange: ChangeEventHandler<HTMLInputElement>
  type?: string
  title?: string
  button?: boolean
  onClick?: () => void | undefined | Promise<void>
}

type disabledTextProps = {
  text?: string
  title?: string
  button?: boolean
  onClick?: () => void | undefined | Promise<void>
}

export default function InputText({
  placeholder,
  warning,
  guide,
  onChange,
  text,
  type,
  title,
  onClick,
  button = false,
}: inputTextProps) {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <div className={style.buttonWrapper}>
        <input
          className={style.input}
          type={type ? type : 'text'}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={text}
        />
        {button && (
          <Button
            text={'인증하기'}
            mainColor={onClick ? 'green' : 'grey'}
            action={onClick}
          />
        )}
      </div>

      {warning && <div className={style.errorText}>{warning}</div>}
      {guide && <div className={style.guideText}>{guide}</div>}
    </div>
  )
}
export function DisabledText({
  text = '',
  title,
  onClick,
  button = false,
}: disabledTextProps) {
  return (
    <div className={style.wrapper}>
      <p className={style.title}>{title}</p>
      <div className={style.buttonWrapper}>
        <input
          className={style.disabledText}
          type="text"
          value={text}
          readOnly
        />
        {button && (
          <Button
            text={'인증하기'}
            mainColor={onClick ? 'green' : 'grey'}
            action={onClick}
          />
        )}
      </div>
    </div>
  )
}
