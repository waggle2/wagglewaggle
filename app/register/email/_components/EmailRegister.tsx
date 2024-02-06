'use client'
import style from '../styles/emailRegister.module.scss'
import cs from 'classnames/bind'
const cx = cs.bind(style)
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import { ChangeEvent, FormEvent, useState } from 'react'
import { IInputFileds } from '@/app/_hooks/useFormInput'
import axios from 'axios'
import Button from '@/app/_components/button/Button'
import InputGroup from '@/app/_components/userForm/InputGroup'

export const api = axios.create({
  baseURL:
    'http://ec2-43-201-195-164.ap-northeast-2.compute.amazonaws.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

interface Props {
  inputFields: IInputFileds
  errors: IInputFileds
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function EmailForm({
  inputFields,
  errors,
  handleSubmit,
  handleChange,
  passable,
}: Props) {
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

  return (
    <>
      <h2 className={style.hTitle}>
        와글와글의 새 친구로 <br />
        변신 중이에요
      </h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputDiv}>
          <InputGroup
            labelText="이메일"
            inputProps={{
              type: 'email',
              placeholder: '이메일을 적어주세요',
              maxLength: 30,
              name: 'email',
              onChange: handleChange,
              value: inputFields.email ?? '',
            }}
            buttonProps={{
              text: '인증하기',
              active: !!(inputFields.email && !errors.email),
              inactive: !!(!inputFields.email || errors.email),
              onClick: () =>
                inputFields.email &&
                !errors.email &&
                sendCheckEmailCode(inputFields.email),
              type: 'button',
            }}
            errorMessage={errors.email}
          />
        </div>
        <div className={style.inputDiv}>
          <InputGroup
            labelText="인증코드"
            inputProps={{
              type: 'number',
              placeholder: '인증코드를 확인해주세요',
              maxLength: 6,
              name: 'emailCheck',
              onChange: handleChange,
              value: inputFields.emailCheck ?? '',
            }}
            buttonProps={{
              text: '인증확인',
              active: !!(inputFields.emailCheck && !errors.emailCheck),
              inactive: !!(!inputFields.emailCheck || errors.emailCheck),
              onClick: () => {
                if (inputFields.email) getCheckEmailCode(inputFields.email)
              },
              type: 'button',
            }}
            errorMessage={errors.emailCheck}
          />
        </div>
        <div className={style.inputDiv}>
          <InputGroup
            labelText="비밀번호"
            inputProps={{
              type: 'password',
              placeholder: '비밀번호를 입력해주세요',
              maxLength: 30,
              name: 'password',
              onChange: handleChange,
              value: inputFields.password ?? '',
            }}
            inputIcon={
              passwordView ? (
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
              )
            }
            errorMessage={errors.password}
            description=" 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요."
          />
        </div>
        <div className={style.inputGroupDiv}>
          <InputGroup
            labelText="비밀번호 확인"
            inputProps={{
              type: 'password',
              placeholder: '비밀번호를 입력해주세요',
              maxLength: 30,
              name: 'passwordCheck',
              onChange: handleChange,
              value: inputFields.passwordCheck ?? '',
            }}
            inputIcon={
              passwordView ? (
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
              )
            }
            errorMessage={errors.passwordCheck}
          />
        </div>
        <div className={style.buttonDiv}>
          <Button
            mainColor={passable ? 'green' : 'grey'}
            text="계속하기"
            isDisabled={!passable}
          />
        </div>
      </form>
    </>
  )
}
