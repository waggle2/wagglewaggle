'use client'

import { useState } from 'react'
import InfoEdit from './_components/InfoEdit'
import VerifyPassword from './_components/VerifyPassword'

export default function EditInformation() {
  const [step, setStep] = useState(1)

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  switch (step) {
    case 1:
      return <VerifyPassword onClick={handleNextStep} />
    case 2:
      return <InfoEdit />
    default:
      return <VerifyPassword onClick={handleNextStep} />
  }
}
