'use client'

import style from './withdrawal.module.scss'
import { useRouter } from 'next/navigation'

import Header from '@/app/_components/common/header/Header'
import Back from '@/app/_components/common/header/_components/Back'
import Guideline from './_component/guideline'
import { ChangeEvent, useState } from 'react'
import Reason from './_component/reason'

export default function Withdrawal() {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(0)
  const [otherReason, setOtherReason] = useState('')
  const REASON = [
    '자주 사용하지 않아요',
    '서비스 오류가 있어요',
    '친구들이 마음에 들지 않아요',
    '기타',
  ]

  const handleBack = () => {
    router.back()
  }
  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const handleChangeReason = (index: number) => {
    setSelected(() => index)
  }
  const handleOtherReason = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOtherReason(() => e.target.value)
  }
  return (
    <>
      <Header leftSection={<Back />} title={'회원탈퇴'} />
      <div className={style.container}>
        {step === 1 && (
          <Guideline handleBack={handleBack} handleNextStep={handleNextStep} />
        )}
        {step === 2 && (
          <Reason
            reasons={REASON}
            selected={selected}
            onClick={handleChangeReason}
            otherReason={otherReason}
            setOtherReason={handleOtherReason}
            handleBack={handleBack}
          />
        )}

        <div className={style.notice}>
          다음단계로 진행하면 와글와글
          <span className={style.strong}>이용약관</span> 및 <br />
          <span className={style.strong}>개인정보처리방침</span>에 동의하게
          됩니다.
        </div>
      </div>
    </>
  )
}
