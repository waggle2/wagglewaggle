'use client'

import style from '../styles/accountForm.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useFormInput, { IInputFileds } from '@/app/_hooks/useFormInput'
import axios from 'axios'
import Button from '@/app/_components/button/Button'
import { checkObject } from '@/app/_lib/validate'

export const api = axios.create({
  baseURL:
    'http://ec2-43-201-195-164.ap-northeast-2.compute.amazonaws.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

interface Props {
  setUserTotalDatas: Dispatch<SetStateAction<any>>
  userTotalDatas: IInputFileds
  nextStep: () => void
}

export default function AccountForm({
  userTotalDatas,
  setUserTotalDatas,
  nextStep,
}: Props) {
  const { inputFields, errors, submitting, handleChange, handleSubmit } =
    useFormInput({
      email: '',
      emailCheck: '',
      password: '',
      passwordCheck: '',
    })

  async function sendCheckEmailCode(email: string) {
    try {
      const result = await api.post('/users/email-verification', { email })
      return result
    } catch (error) {
      console.error(error)
    }
  }
  async function getCheckEmailCode(email: string) {
    try {
      const result = await api.post('/users/email-verification', { email })
      return result
    } catch (error) {
      console.error(error)
    }
  }

  const [passwordView, setPasswordView] = useState(false)
  const [passable, setPassable] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && checkObject(inputFields)) {
      setPassable(true)
    }
    if (Object.keys(errors).length === 0 && submitting) {
      setUserTotalDatas({ userTotalDatas, ...inputFields })
    }
  }, [errors, submitting])

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
            onClick={() =>
              inputFields.email &&
              !errors.email &&
              sendCheckEmailCode(inputFields.email)
            }
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
            onClick={() => {
              if (inputFields.email) getCheckEmailCode(inputFields.email)
            }}
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
        <Button
          mainColor={passable ? 'green' : 'grey'}
          text="계속하기"
          action={nextStep}
          isDisabled={!passable}
        />
      </form>
    </>
  )
}
