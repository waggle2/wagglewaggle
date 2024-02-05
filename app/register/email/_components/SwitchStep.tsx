'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import RegisterAgree from './RegisterAgree'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import Back2 from '/public/assets/back.svg'
import Close from '@/app/_components/common/header/_components/Close'
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

  switch (step) {
    case 1:
      return (
        <>
          <button onClick={() => console.log(userTotalDatas)} type="button">
            토탈 데이터
          </button>
          <Header
            isNoneSidePadding={true}
            leftSection={
              <span style={{ cursor: 'pointer' }}>
                <Back />
              </span>
            }
            title="이메일로 가입하기"
            rightSection={[<Close clickEvent={() => router.back()} />]}
          />
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
          <button onClick={() => console.log(userTotalDatas)}>
            토탈 데이터
          </button>
          <Header
            isNoneSidePadding={true}
            leftSection={
              <span style={{ cursor: 'pointer' }}>
                <Back2 onClick={prevStep} />
              </span>
            }
            title="회원가입"
            rightSection={[<Close clickEvent={() => router.back()} />]}
          />
          <FormPresetProvider
            formDataObject={{
              nickname: '',
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
          <button onClick={() => console.log(userTotalDatas)}>
            토탈 데이터
          </button>
          <Header
            isNoneSidePadding={true}
            leftSection={
              <span style={{ cursor: 'pointer' }}>
                <Back2 onClick={prevStep} />
              </span>
            }
            title="회원가입"
            rightSection={[<Close clickEvent={() => router.back()} />]}
          />
          <FormPresetProvider
            formDataObject={{
              realname: '',
              birthYear: '',
              gender: '',
            }}
            formDataType="email"
            nextStep={nextStep}
            setUserTotalDatas={setUserTotalDatas}
            userTotalDatas={userTotalDatas}
          />

          {/* <RegisterBirth
            nextStep={nextStep}
            userTotalDatas={userTotalDatas}
            setUserTotalDatas={setUserTotalDatas}
          /> */}
        </>
      )
    case 4:
      return (
        <>
          <button onClick={() => console.log(userTotalDatas)}>
            토탈 데이터
          </button>
          <Header
            isNoneSidePadding={true}
            leftSection={
              <span style={{ cursor: 'pointer' }}>
                <Back2 onClick={prevStep} />
              </span>
            }
            title="약관동의"
            rightSection={[<Close clickEvent={() => router.back()} />]}
          />
          <RegisterAgree />
        </>
      )
    default:
      return null
  }
}
