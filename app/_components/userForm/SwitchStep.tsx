'use client'

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import { useRouter, useSearchParams } from 'next/navigation'
import { IInputFileds } from '@/app/_types/userFormTypes'
import FormPresetProvider from '@/app/_components/userForm/FormPresetProvider'
interface Props {
  type: 'email' | 'resetPassword'
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
  initStep?: number
}

export default function SwitchStep({
  type,
  initStep = 1,
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSocial = !!searchParams.get('social')
  const [step, setStep] = useState(isSocial ? 2 : 1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const goBack = () => {
    if (isSocial && step === 2) {
      router.replace('/register')
      return
    }
    prevStep()
  }

  const changeBody = (step: number): ReactNode => {
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
                isNicknameChecked: '',
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
            <Back handleBack={goBack} />
          </span>
        }
        title="회원가입"
      />
      {changeBody(step)}
    </>
  )
}