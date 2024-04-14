import { IFormProps } from '@/app/_types/userFormTypes'
import style from '../styles/changePassword.module.scss'
import { useState } from 'react'
import InputGroup from '@/app/_components/userForm/InputGroup'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import Button from '@/app/_components/button/Button'
import { useResetPassword } from '@/app/_hooks/services/mutations/userRegister'
import { useRouter } from 'next/navigation'

export default function ChangePassword({
  inputFields,
  errors,
  handleChange,
  passable,
}: IFormProps) {
  const [passwordView, setPasswordView] = useState(false)
  const mutation = useResetPassword()
  const router = useRouter()

  const finishSubmit = () => {
    const email = inputFields.email ?? ''
    const newPassword = inputFields.password ?? ''

    mutation.mutate(
      { email, newPassword },
      {
        onSuccess: () => {
          alert('비밀번호가 변경되었습니다.')
          router.replace('/')
        },
        onError: (error) => {
          console.error(error)
          if (error.code === 404) {
            alert('사용자를 찾을 수 없습니다.')
            return
          }
          alert('비밀번호 변경에 실패하였습니다.')
          router.replace('/reset-password')
        },
      },
    )
  }

  return (
    <>
      <h2 className={style.hTitle}>
        새로운 비밀번호를
        <br />
        설정해주세요
      </h2>
      <div className={style.form}>
        <div className={style.inputDiv}>
          <InputGroup
            labelText="비밀번호"
            inputProps={{
              type: passwordView ? 'text' : 'password',
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
              type: passwordView ? 'text' : 'password',
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
        <div className={style.actionButtonDiv}>
          <Button
            mainColor={passable ? 'green' : 'grey'}
            text="계속하기"
            isDisabled={!passable}
            action={finishSubmit}
          />
        </div>
      </div>
    </>
  )
}
