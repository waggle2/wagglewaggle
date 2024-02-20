import { IInputFileds } from '@/app/_types/userFormTypes'
import style from '../styles/confirmEmail.module.scss'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react'
import InputGroup from '@/app/_components/userForm/InputGroup'
import { useSendCheckEmailCode } from '@/app/_hooks/services/mutations/userRegister'

interface Props {
  inputFields: IInputFileds
  setInputFields: Dispatch<SetStateAction<IInputFileds>>
  errors: IInputFileds
  setErrors: Dispatch<SetStateAction<any>>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  passable: boolean
}

export default function ConfirmEmail({
  inputFields,
  setInputFields,
  errors,
  setErrors,
  handleSubmit,
  handleChange,
  passable,
}: Props) {
  const mutationCheckEmail = useSendCheckEmailCode()
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

  return (
    <>
      <h2 className={style.hTitle}>
        다시 친구들과 만날 수 있도록
        <br /> 저희가 도와드릴게요
      </h2>
      <p className={style.subTitle}>
        입력하신 이메일 주소로
        <br />
        비밀번호 재설정 메일을 보내드려요
      </p>
      <form className={style.form}>
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
      </form>
    </>
  )
}
