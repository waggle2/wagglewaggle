'use client'

import style from '../styles/accountForm.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import InputGroup from './InputGroup'
import { ChangeEvent, useEffect, useState } from 'react'
import { validate, IErrors } from '@/app/_lib/validate'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'

interface IInputFileds {
  email: string
  emailCheck: number | null
  password: string
  passwordCheck: string
}

export default function AccountForm() {
  const [inputFields, setInputFields] = useState<IInputFileds>({
    email: '',
    emailCheck: null,
    password: '',
    passwordCheck: '',
  })
  const [errors, setErrors] = useState<IErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [passwordView, setPasswordView] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    const updatedInputFields = { ...inputFields, [name]: value }
    setInputFields(updatedInputFields)

    const validationErrors = validate(updatedInputFields)
    setErrors(validationErrors)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
  }

  const finishSubmit = () => {
    console.log(inputFields)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit()
    }
  }, [errors])

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3 className={style.title}>이메일</h3>
        <div className={style.inputDiv}>
          <label className={style.label}>
            <input
              type="email"
              placeholder="이메일을 적어주세요"
              maxLength={30}
              name="email"
              onChange={handleChange}
              value={inputFields.email}
            />
          </label>
          <button
            className={cx('button', {
              active: inputFields.email && !errors.email,
              inactive: !inputFields.email || errors.email,
            })}
          >
            인증하기
          </button>
        </div>
        {errors.email && <p className={style.error}>{errors.email}</p>}
        <h3 className={style.title}>인증코드</h3>
        <div className={style.inputDiv}>
          <label className={style.label}>
            <input
              type="number"
              placeholder="인증코드를 적어주세요"
              maxLength={6}
              name="emailCheck"
              onChange={handleChange}
              value={inputFields.emailCheck ?? ''}
            />
          </label>
          <button
            className={cx('button', {
              active: inputFields.emailCheck && !errors.emailCheck,
              inactive: !inputFields.emailCheck || errors.emailCheck,
            })}
          >
            인증확인
          </button>
        </div>
        {errors.emailCheck && (
          <p className={style.error}>{errors.emailCheck}</p>
        )}
        <h3 className={style.title}>비밀번호</h3>
        <div className={style.inputDiv}>
          <label className={style.label}>
            <input
              type="password"
              placeholder="비밀번호를 적어주세요"
              maxLength={30}
              name="password"
              onChange={handleChange}
              value={inputFields.password}
            />
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
          </label>
        </div>
        {errors.password && <p className={style.error}>{errors.password}</p>}
        <h3 className={style.title}>비밀번호</h3>
        <div className={style.inputGroupDiv}>
          <label className={style.label}>
            <input
              type="password"
              placeholder="비밀번호를 한번 더 적어주세요"
              maxLength={30}
              name="passwordCheck"
              onChange={handleChange}
              value={inputFields.passwordCheck}
            />
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
          </label>
        </div>
        {errors.passwordCheck && (
          <p className={style.error}>{errors.passwordCheck}</p>
        )}

        <button>전송</button>
      </form>
      <button onClick={() => console.log(errors)}>오류</button>
      <button onClick={() => console.log(inputFields)}>밸류</button>
    </>
  )
}
