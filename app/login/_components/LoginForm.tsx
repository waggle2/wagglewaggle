'use client'
import style from './styles/loginForm.module.scss'
import View2 from '/public/assets/view2.svg'
import NotView from '/public/assets/notView.svg'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '@/app/_components/button/Button'
import { IErrors, IInputFileds } from '@/app/_types/userFormTypes'
import InputGroup from '@/app/_components/userForm/InputGroup'
import { useLoginUser } from '@/app/_hooks/services/mutations/userLogin'
import { useRouter } from 'next/navigation'

type Props = {
  inputFields: IInputFileds
  setInputFields: Dispatch<SetStateAction<IInputFileds>>
  errors: IErrors
  setErrors: Dispatch<SetStateAction<any>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function LoginForm({
  inputFields,
  setInputFields,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  passable,
}: Props) {
  const [passwordView, setPasswordView] = useState(false)
  const mutation = useLoginUser()
  const router = useRouter()

  const handleFinish = async () => {
    const body = {
      email: inputFields.loginEmail ?? '',
      password: inputFields.loginPassword ?? '',
    }
    if (!body.email || !body.password) return alert('모든 항목을 입력해주세요')
    try {
      mutation.mutate(body, {
        onSuccess: () => {
          setErrors({ ...errors, loginPassword: '' })
          router.replace('/')
        },
        onError: (error) => {
          const typeError = error as { code?: number; message: string }
          if (typeError.code === 404) {
            setErrors({
              ...errors,
              loginPassword: '이메일 혹은 비밀번호가 일치하지 않습니다',
            })
          }
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className={style.loginForm}
      onSubmit={(e) => {
        handleSubmit(e)
        handleFinish()
      }}
    >
      <div className={style.inputDiv}>
        <InputGroup
          isTitle={false}
          inputProps={{
            type: 'email',
            placeholder: '이메일을 입력해주세요',
            value: inputFields.loginEmail ?? '',
            onChange: handleChange,
            name: 'loginEmail',
          }}
        />
      </div>
      <div className={style.inputDiv}>
        <InputGroup
          isTitle={false}
          inputProps={{
            type: 'password',
            placeholder: '비밀번호를 입력해주세요',
            value: inputFields.loginPassword ?? '',
            onChange: handleChange,
            name: 'loginPassword',
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
          errorMessage={errors.loginPassword}
        />
      </div>
      <div className={style.buttonWrapper}>
        <Button mainColor={passable ? 'green' : 'grey'} text="로그인 하기" />
      </div>
    </form>
  )
}
