'use client'

import Button from '@/app/_components/button/Button'
import style from '../styles/inputGroup.module.scss'
import { ChangeEvent, useState } from 'react'
import cs from 'classnames/bind'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
const cx = cs.bind(style)

interface Props {
  title: string
  inputType: string
  placeholder: string
  isButton?: boolean
  buttonText?: string
  nameType: 'email' | 'emailCheck' | 'password' | 'passwordCheck'
  inputValue: string | number | null
  changeEvent: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputGroup({
  title,
  inputType,
  placeholder,
  nameType,
  isButton = false,
  buttonText,
  inputValue,
  changeEvent,
}: Props) {
  const [submitable, setSubmitable] = useState(false)
  const [passwordView, setPasswordView] = useState(false)

  return (
    <>
      <span className={style.titleSpan}>{title}</span>
      <div className={style.inputDiv}>
        <label className={style.label}>
          <input
            type={inputType}
            placeholder={placeholder}
            maxLength={20}
            name={nameType}
          />
          {inputType === 'password' && (
            <span>
              {passwordView ? (
                <View2
                  onClick={() => setPasswordView(!passwordView)}
                  width={20}
                  height={20}
                />
              ) : (
                <NotView
                  onClick={() => setPasswordView(!passwordView)}
                  width={20}
                  height={20}
                />
              )}
            </span>
          )}
        </label>
        {isButton && (
          <button
            className={cx('button', {
              active: submitable,
              inactive: !submitable,
            })}
          >
            {buttonText}
          </button>
        )}
      </div>
    </>
  )
}
