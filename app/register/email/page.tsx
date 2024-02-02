'use client'
import { useState } from 'react'
import RegisterName from './_components/RegisterName'
import RegisterEmail from './_components/RegisterEmail'
import RegisterBirth from './_components/RegisterBirth'
import RegisterAgree from './_components/RegisterAgree'
import Header from '@/app/_components/common/header/page'
import Back from '@/app/_components/common/header/_components/Back'
import Back2 from '/public/assets/back.svg'
import Close from '@/app/_components/common/header/_components/Close'
import { useRouter } from 'next/navigation'

export default function page() {
  const [step, setStep] = useState(1)
  const [userTotalDatas, setUserTotalDatas] = useState({} as any)
  const router = useRouter()
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    console.log(step)
    setStep(step - 1)
  }

  switch (step) {
    case 1:
      return (
        <>
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
          <RegisterEmail
            nextStep={nextStep}
            userTotalDatas={userTotalDatas}
            setUserTotalDatas={setUserTotalDatas}
          />
        </>
      )
    case 2:
      return (
        <>
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
          <RegisterName
            userTotalDatas={userTotalDatas}
            setUserTotalDatas={setUserTotalDatas}
            nextStep={nextStep}
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
          <RegisterBirth prevStep={prevStep} nextStep={nextStep} />
        </>
      )
    case 4:
      return (
        <>
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
