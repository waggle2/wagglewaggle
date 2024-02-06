'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import RegisterAgree from './RegisterAgree'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import { useRouter } from 'next/navigation'
import FormPresetProvider from './FormPresetProvider'
import { IInputFileds } from '@/app/_hooks/useFormInput'
interface Props {
  userTotalDatas: IInputFileds
  setUserTotalDatas: Dispatch<SetStateAction<IInputFileds>>
}

export default function SwitchStep({
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

  const changeBody = (step: number): ReactNode => {
    switch (step) {
      case 0:
        router.push('/register')
      case 1:
        return (
          <>
            <FormPresetProvider
              formDataObject={{
                email: '',
                emailCheck: '',
                password: '',
                passwordCheck: '',
              }}
              formDataType="email"
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
                birthYear: '',
                gender: '',
              }}
              formDataType="name"
              nextStep={nextStep}
              setUserTotalDatas={setUserTotalDatas}
              userTotalDatas={userTotalDatas}
            />
          </>
        )
      case 3:
        return (
          <>
            <RegisterAgree />
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
        rightSection={[
          <button onClick={() => console.log(userTotalDatas)} type="button">
            data
          </button>,
        ]}
      />
      {changeBody(step)}
    </>
  )
}
