'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import RegisterAgree from '../../register/email/_components/RegisterAgree'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import { useRouter } from 'next/navigation'
import { IInputFileds } from '@/app/_types/userFormTypes'
import FormPresetProvider from './FormPresetProvider'
interface Props {
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
  type: 'email' | 'resetPassword'
}

export default function SwitchStep({
  type,
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const changeBodyInResetPassword = (step: number): ReactNode => {
    switch (step) {
      case 0:
        router.replace('/login')
        break
      case 1:
        return (
          <FormPresetProvider
            formDataObject={{ email: '', isEmailChecked: false }}
            formDataType="emailConfirm"
            step={step}
            nextStep={nextStep}
            setUserTotalDatas={setUserTotalDatas}
            userTotalDatas={userTotalDatas}
          />
        )
      case 2:
        return (
          <FormPresetProvider
            formDataObject={{ password: '', passwordCheck: '' }}
            formDataType="resetPassword"
            step={step}
            nextStep={nextStep}
            setUserTotalDatas={setUserTotalDatas}
            userTotalDatas={userTotalDatas}
          />
        )
      default:
        return null
    }
  }

  const changeBodyInRegisterEmail = (step: number): ReactNode => {
    switch (step) {
      case 0:
        router.replace('/register')
        break
      case 1:
        return (
          <>
            <FormPresetProvider
              formDataObject={{
                email: '',
                emailCheck: '',
                isEmailChecked: false,
                password: '',
                passwordCheck: '',
              }}
              formDataType="email"
              step={step}
              nextStep={nextStep}
              setUserTotalDatas={setUserTotalDatas}
              userTotalDatas={userTotalDatas}
            />
          </>
        )
      case 2:
        return (
          <>
            <FormPresetProvider
              formDataObject={{
                nickname: '',
                isNicknameChecked: false,
                birthYear: '',
                gender: '',
              }}
              formDataType="name"
              step={step}
              nextStep={nextStep}
              setUserTotalDatas={setUserTotalDatas}
              userTotalDatas={userTotalDatas}
            />
          </>
        )
      case 3:
        return (
          <>
            <FormPresetProvider
              formDataObject={{}}
              formDataType="agree"
              step={step}
              nextStep={nextStep}
              setUserTotalDatas={setUserTotalDatas}
              userTotalDatas={userTotalDatas}
            />
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header
        isNoneSidePadding={true}
        leftSection={
          <span style={{ cursor: 'pointer' }}>
            <Back handleBack={prevStep} />
          </span>
        }
        title="회원가입"
      />
      {type === 'email' && changeBodyInRegisterEmail(step)}
      {type === 'resetPassword' && changeBodyInResetPassword(step)}
    </>
  )
}
