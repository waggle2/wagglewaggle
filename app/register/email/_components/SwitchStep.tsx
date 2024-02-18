'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { IInputFileds } from '@/app/_types/userFormTypes'
import FormPresetProvider from '@/app/_components/userForm/FormPresetProvider'
interface Props {
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
}

export default function ccccSwitchStep({
  userTotalDatas,
  setUserTotalDatas,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initStep = Number(searchParams.get('step'))
  const [step, setStep] = useState(initStep ?? 1)
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
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
      {changeBody(step)}
    </>
  )
}
