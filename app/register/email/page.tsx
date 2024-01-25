'use client'
import { useState } from 'react'
import RegisterName from './_components/RegisterName'
import RegisterEmail from './_components/RegisterEmail'
import RegisterBirth from './_components/RegisterBirth'
import RegisterHeader from './_components/RegisterHeader'

export default function page() {
  const [step, setStep] = useState(1)

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
          <RegisterHeader />
          <RegisterName nextStep={nextStep} />
        </>
      )
    case 2:
      return (
        <>
          <RegisterHeader title="이메일로 가입하기" />
          <RegisterEmail nextStep={nextStep} prevStep={prevStep} />
        </>
      )
    case 3:
      return (
        <>
          <RegisterHeader />
          <RegisterBirth prevStep={prevStep} />
        </>
      )
    default:
      return null
  }
}
