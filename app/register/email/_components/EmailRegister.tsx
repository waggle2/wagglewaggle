'use client'
import style from '../styles/emailRegister.module.scss'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import Button from '@/app/_components/button/Button'
import InputGroup from '@/app/_components/userForm/InputGroup'
import { IInputFileds } from '@/app/_types/userFormTypes'
import {
  useConfirmEmailCode,
  useSendCheckEmailCode,
} from '@/app/_hooks/services/mutations/userRegister'

interface Props {
  inputFields: IInputFileds
  setInputFields: Dispatch<SetStateAction<IInputFileds>>
  errors: IInputFileds
  setErrors: Dispatch<SetStateAction<any>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function EmailForm({
  inputFields,
  setInputFields,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  passable,
}: Props) {
  const mutationCheckEmail = useSendCheckEmailCode()
  const mutationConfirmEmail = useConfirmEmailCode()
  async function sendCheckEmailCode(email: string) {
    mutationCheckEmail.mutate(email, {
      onError: (error) => {
        console.error(error)
        if (error.code === 400) {
          return setErrors({ ...errors, email: '이미 가입된 이메일입니다.' })
        }
        alert('인증코드 발송에 실패하였습니다.')
      },
    })
  }

  async function confirmEmailCode(email: string, emailCheckNumber: string) {
    mutationConfirmEmail.mutate(
      { email, emailCheckNumber },
      {
        onSuccess: (response) => {
          if (!response.data.verified) {
            setErrors({
              ...errors,
              emailCheck: '인증코드가 일치하지 않습니다.',
            })
            alert('인증에 실패하였습니다.')
            return
          }
          setInputFields({ ...inputFields, isEmailChecked: 'true' })
        },
        onError: (error) => {
          console.error(error)
          if (error.code === 400) {
            return setErrors({
              ...errors,
              emailCheck: '인증코드가 일치하지 않습니다.',
            })
          }
          alert('인증에 실패하였습니다.')
        },
      },
    )
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
              tabIndex: 1,
              disabled: !!inputFields.isEmailChecked,
            }}
            buttonProps={{
              text: inputFields.isEmailChecked ? '인증완료' : '인증하기',
              active: !!(
                inputFields.email &&
                !errors.email &&
                !inputFields.isEmailChecked
              ),
              inactive: !!(
                !inputFields.email ||
                errors.email ||
                inputFields.isEmailChecked
              ),
              onClick: () =>
                inputFields.email &&
                !errors.email &&
                sendCheckEmailCode(inputFields.email),
              disabled: !!inputFields.isEmailChecked,
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
              tabIndex: 2,
              disabled: !!inputFields.isEmailChecked,
            }}
            buttonProps={{
              text: inputFields.isEmailChecked ? '인증완료' : '인증확인',
              active: !!(
                inputFields.emailCheck &&
                !errors.emailCheck &&
                !inputFields.isEmailChecked
              ),
              inactive: !!(
                !inputFields.emailCheck ||
                errors.emailCheck ||
                inputFields.isEmailChecked
              ),
              onClick: () => {
                if (inputFields.email)
                  confirmEmailCode(
                    inputFields.email,
                    inputFields.emailCheck ?? '',
                  )
              },
              disabled: !!inputFields.isEmailChecked,
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
              tabIndex: 3,
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
              tabIndex: 4,
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
