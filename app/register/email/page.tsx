'use client'
import { useState } from 'react'
import RegisterName from './_components/RegisterName'
import RegisterEmail from './_components/RegisterEmail'
import RegisterBirth from './_components/RegisterBirth'
import RegisterHeader from './_components/RegisterHeader'
import RegisterAgree from './_components/RegisterAgree'

export default function page() {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    console.log(step)
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
          <RegisterHeader title="이메일로 가입하기" />
          <RegisterEmail nextStep={nextStep} />
        </>
      )
    case 2:
      return (
        <>
          <RegisterHeader title="회원가입" />
          <RegisterName prevStep={prevStep} nextStep={nextStep} />
        </>
      )
    case 3:
      return (
        <>
          <RegisterHeader title="회원가입" />
          <RegisterBirth prevStep={prevStep} nextStep={nextStep} />
        </>
      )
    case 4:
      return (
        <>
          <RegisterHeader title="약관동의" />
          <RegisterAgree prevStep={prevStep} />
        </>
      )
    default:
      return null
  }
}
